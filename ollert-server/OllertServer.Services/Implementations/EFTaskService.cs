using System;
using System.Collections.Generic;
using System.Linq;
using t = System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

using OllertServer.Services.Interfaces;
using OllertServer.Repositories;
using OllertServer.Models.Dtos;
using OllertServer.Models.InputModels;
using OllertServer.Models.Entities;

namespace OllertServer.Services.Implementations
{
    public class EFTaskService : ITaskService
    {
        private PropertyContext _context { get; }
        private IMapper _mapper { get; }
        public EFTaskService(PropertyContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async t.Task<TaskDto> Create(TaskInputModel input)
        {
            var task = _mapper.Map<Task>(input);
            _context.Add(task);
            await _context.SaveChangesAsync();

            return _mapper.Map<TaskDto>(task);
        }

        public async t.Task<TaskDto> GetSingle(Guid id)
        {
            var task = await _context.Tasks
                .Where(t => t.Id == id)
                .ProjectTo<TaskDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
            return task;
        }

        public async t.Task Update(Guid id, TaskUpdateDto input)
        {
            var task = await _context.Tasks
                .Where(t => t.Id == id)
                .SingleOrDefaultAsync();

            task.Name = input.Name ?? task.Name;
            _context.Update(task);
            await _context.SaveChangesAsync();
        }
    }
}