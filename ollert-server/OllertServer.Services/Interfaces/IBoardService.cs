using System;
using System.Collections.Generic;
using t = System.Threading.Tasks;

using OllertServer.Models.Dtos;
using OllertServer.Models.InputModels;
using OllertServer.Models.Entities;

namespace OllertServer.Services.Interfaces
{
    public interface IBoardService
    {
        t.Task<List<BoardDto>> GetForUser(string userEmail);
        t.Task<BoardDetailDto> GetSingle(Guid id);
        t.Task<BoardDetailDto> Create(string userEmail, BoardInputModel input);
        t.Task Update(Guid id, BoardUpdateDto input);
    }
}