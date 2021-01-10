using System;
using System.Threading.Tasks;

using OllertServer.Models.Entities;
using OllertServer.Models.InputModels;

namespace OllertServer.Services.Interfaces
{
    public interface IAccountService
    {
        Task<string> Login(LoginInputModel userInput);
        Task<string> Register(RegisterInputModel userInput);
        Task<string> GenerateToken(ApplicationUser user);
    }
}