using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using OllertServer.Models.Dtos;
using OllertServer.Models.InputModels;

namespace OllertServer.Services.Interfaces
{
    public interface ITaskService
    {
        Task<TaskDto> GetSingle(Guid id);
        Task<TaskDto> Create(TaskInputModel input);
    }
}