using System;
using System.Collections.Generic;
using t = System.Threading.Tasks;

using OllertServer.Models.Dtos;
using OllertServer.Models.InputModels;

namespace OllertServer.Services.Interfaces
{
    public interface ITaskService
    {
        t.Task<TaskDto> GetSingle(Guid id);
        t.Task<TaskDto> Create(TaskInputModel input);
        t.Task Update(Guid id, TaskUpdateDto input);
        t.Task Delete(Guid id);
    }
}