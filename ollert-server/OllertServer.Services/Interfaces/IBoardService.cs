using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using OllertServer.Models.Dtos;

namespace OllertServer.Services.Interfaces
{
    public interface IBoardService
    {
        Task<List<BoardDto>> GetAll();
        Task<BoardDetailDto> GetSingle(Guid id);
    }
}