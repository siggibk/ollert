using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

using OllertServer.Services.Interfaces;
using OllertServer.Models.Entities;
using OllertServer.Models.InputModels;
using OllertServer.Models.Dtos;

namespace OllertServer.Services.Implementations
{
    public class EFAccountService : IAccountService
    {
        private SignInManager<ApplicationUser> _signInManager { get; }
        private UserManager<ApplicationUser> _userManager { get; }
        private IConfiguration _configuration { get; }

        public EFAccountService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration
        )
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<JwtTokenDto> Login(LoginInputModel userInput)
        {
            var validate = await _signInManager.PasswordSignInAsync(
                userInput.Email,
                userInput.Password,
                false,
                false
            );

            if (validate.Succeeded)
            {
                var user = _userManager.Users.SingleOrDefault(u => u.Email == userInput.Email);
                return new JwtTokenDto
                {
                    Access = await GenerateToken(user)
                };
            }
            // TODO raise failed login exception
            throw new Exception();
        }

        public async Task<JwtTokenDto> Register(RegisterInputModel userInput)
        {
            var user = await _userManager.FindByEmailAsync(userInput.Email);

            if (user != null)
            {
                // TODO custom exception
                throw new Exception();
            }

            var userObject = new ApplicationUser
            {
                UserName = userInput.Email,
                Email = userInput.Email
            };

            var createAction = await _userManager.CreateAsync(userObject, userInput.Password);

            if (createAction.Succeeded)
            {
                await _signInManager.SignInAsync(userObject, false);
                return new JwtTokenDto
                {
                    Access = await GenerateToken(userObject)
                };
            }

            // TODO custom exception
            throw new Exception();
        }

        public async Task<string> GenerateToken(ApplicationUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Role, string.Join(',', roles)),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpirationDays"]));

            var token = new JwtSecurityToken(
                _configuration["JwtIssuer"],
                _configuration["JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}