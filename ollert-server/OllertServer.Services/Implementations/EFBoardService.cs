using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;

using OllertServer.Repositories;
using OllertServer.Models.Dtos;
using OllertServer.Services.Interfaces;

namespace OllertServer.Services.Implementations
{
    public class EFBoardService : IBoardService
    {
        private PropertyContext Context { get; }
        private IMapper Mapper { get; }
        public EFBoardService(PropertyContext context, IMapper mapper)
        {
            Context = context;
            Mapper = mapper;
        }
        public Task<List<BoardDto>> GetAll()
        {
            return Context.Boards
                .ProjectTo<BoardDto>(Mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public Task<BoardDetailDto> GetSingle(Guid id)
        {
            return Context.Boards
                .Where(p => p.Id == id)
                .ProjectTo<BoardDetailDto>(Mapper.ConfigurationProvider)
                .SingleAsync();
        }
    }
}