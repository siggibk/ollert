using System;
using System.Threading.Tasks;

using OllertServer.Models.Dtos;
using OllertServer.Models.Entities;
using OllertServer.Models.InputModels;

namespace OllertServer.Services.Interfaces
{
    public interface IAccountService
    {
        ApplicationUserDto GetUser(string email);
        Task<JwtTokenDto> Login(LoginInputModel userInput);
        Task<JwtTokenDto> Register(RegisterInputModel userInput);
        Task<string> GenerateToken(ApplicationUser user);
    }
}