using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

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

        [Authorize]
        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
            var currUserEmail = this.User.FindFirst("sub")?.Value;
            return Ok(_accountService.GetUser(currUserEmail));
        }

        [HttpPost("token")]
        public async Task<IActionResult> GetToken([FromBody] LoginInputModel userInput)
        {
            // TODO login method should throw exception that gets handled instead of this
            var token = await _accountService.Login(userInput);

            if (token != null)
            {
                return Ok(token);
            }

            return Unauthorized();
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterInputModel userInput)
        {
            var token = await _accountService.Register(userInput);

            // TODO register method should throw exception that gets handled instead of this
            if (token != null)
            {
                return Ok(token);
            }

            return Unauthorized();
        }
    }
}