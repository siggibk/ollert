using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

using OllertServer.Services.Interfaces;
using OllertServer.Models.InputModels;
using OllertServer.Models.Entities;

namespace OllertServer.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private IAccountService _accountService { get; }

        public AccountsController(IAccountService accountService, UserManager<ApplicationUser> userManager)
        {
            _accountService = accountService;
        }

        [HttpPost("token")]
        public async Task<IActionResult> GetToken([FromBody] LoginInputModel userInput)
        {
            return Ok(await _accountService.Login(userInput));
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterInputModel userInput)
        {
            return Ok(await _accountService.Register(userInput));
        }
    }
}