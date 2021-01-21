using System;
using System.Collections.Generic;
using t = System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;

using OllertServer.Repositories;
using OllertServer.Models.Dtos;
using OllertServer.Models.InputModels;
using OllertServer.Models.Entities;
using OllertServer.Services.Interfaces;

namespace OllertServer.Services.Implementations
{
    public class EFBoardService : IBoardService
    {
        private PropertyContext _context { get; }
        private IMapper _mapper { get; }
        private UserManager<ApplicationUser> _userManager { get; }

        public EFBoardService(
            PropertyContext context,
            IMapper mapper,
            UserManager<ApplicationUser> userManager
        )
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }
        public async t.Task<List<BoardDto>> GetForUser(string userEmail)
        {
            var user = await _userManager.FindByEmailAsync(userEmail);

            var boards = await _context.Boards
                .Where(b => b.UserId == user.Id)
                .ProjectTo<BoardDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return boards;
        }

        public async t.Task<BoardDetailDto> GetSingle(Guid id)
        {
            var board = await _context.Boards
                .Where(p => p.Id == id)
                .ProjectTo<BoardDetailDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
            return board;
        }

        public async t.Task<BoardDetailDto> Create(string userEmail, BoardInputModel input)
        {
            var user = await _userManager.FindByEmailAsync(userEmail);

            var board = _mapper.Map<Board>(input);
            board.User = user;

            _context.Add(board);
            await _context.SaveChangesAsync();

            return _mapper.Map<BoardDetailDto>(board);
        }

        public async t.Task Update(Guid id, BoardUpdateDto input)
        {
            var board = await _context.Boards
                .Where(b => b.Id == id)
                .SingleOrDefaultAsync();

            board.Name = input.Name ?? board.Name;
            _context.Update(board);
            await _context.SaveChangesAsync();
        }

        public async t.Task Delete(Guid id)
        {
            var board = await _context.Boards
                .Where(t => t.Id == id)
                .SingleOrDefaultAsync();

            _context.Remove(board);
            await _context.SaveChangesAsync();
        }
    }
}