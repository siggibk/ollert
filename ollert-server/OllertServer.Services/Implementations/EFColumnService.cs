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
    public class EFColumnService : IColumnService
    {
        private PropertyContext _context { get; }
        private IMapper _mapper { get; }
        public EFColumnService(PropertyContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async t.Task<List<ColumnDetailDto>> GetColumnsForBoard(Guid boardId)
        {
            var columns = await _context.Columns
                .Where(c => c.BoardId == boardId)
                .ProjectTo<ColumnDetailDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return columns;
        }

        public async t.Task<ColumnDetailDto> GetSingle(Guid id)
        {
            var column = await _context.Columns
                .Where(c => c.Id == id)
                .ProjectTo<ColumnDetailDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
            return column;
        }

        public async t.Task<ColumnDetailDto> Create(ColumnInputModel input)
        {
            var column = _mapper.Map<Column>(input);
            _context.Add(column);
            await _context.SaveChangesAsync();
            return _mapper.Map<ColumnDetailDto>(column);
        }

        public async t.Task Update(Guid id, ColumnUpdateDto input)
        {
            var column = await _context.Columns
                .Where(c => c.Id == id)
                .SingleOrDefaultAsync();

            column.Name = input.Name ?? column.Name;
            _context.Update(column);
            await _context.SaveChangesAsync();
        }

        public async t.Task Delete(Guid id)
        {
            var column = await _context.Columns
                .Where(t => t.Id == id)

                .SingleOrDefaultAsync();

            _context.Remove(column);
            await _context.SaveChangesAsync();
        }
    }
}