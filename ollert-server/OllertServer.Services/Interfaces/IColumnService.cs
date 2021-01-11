using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using OllertServer.Models.Dtos;
using OllertServer.Models.InputModels;
using OllertServer.Models.Entities;

namespace OllertServer.Services.Interfaces
{
    public interface IColumnService
    {
        Task<List<ColumnDetailDto>> GetColumnsForBoard(Guid boardId);
        Task<ColumnDetailDto> GetSingle(Guid id);
        Task<ColumnDetailDto> Create(ColumnInputModel input);
    }
}