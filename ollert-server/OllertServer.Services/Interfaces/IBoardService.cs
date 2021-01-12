using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using OllertServer.Models.Dtos;
using OllertServer.Models.InputModels;
using OllertServer.Models.Entities;

namespace OllertServer.Services.Interfaces
{
    public interface IBoardService
    {
        Task<List<BoardDto>> GetForUser(string userEmail);
        Task<BoardDetailDto> GetSingle(Guid id);
        Task<BoardDetailDto> Create(string userEmail, BoardInputModel input);
    }
}