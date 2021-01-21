using System;
using System.Collections.Generic;
using t = System.Threading.Tasks;

using OllertServer.Models.Dtos;
using OllertServer.Models.InputModels;
using OllertServer.Models.Entities;

namespace OllertServer.Services.Interfaces
{
    public interface IColumnService
    {
        t.Task<List<ColumnDetailDto>> GetColumnsForBoard(Guid boardId);
        t.Task<ColumnDetailDto> GetSingle(Guid id);
        t.Task<ColumnDetailDto> Create(ColumnInputModel input);
        t.Task Update(Guid id, ColumnUpdateDto input);
        t.Task Delete(Guid id);
    }
}