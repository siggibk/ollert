using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

using OllertServer.Services.Interfaces;
using OllertServer.Models.Dtos;
using OllertServer.Models.InputModels;

namespace OllertServer.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardsController : ControllerBase
    {
        private IBoardService _boardService { get; }
        private ILogger<BoardsController> _logger { get; }

        public BoardsController(IBoardService boardService, ILogger<BoardsController> logger)
        {
            _boardService = boardService;
            _logger = logger;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var currUserEmail = this.User.FindFirst("sub")?.Value;
            return Ok(await _boardService.GetForUser(currUserEmail));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BoardInputModel input)
        {
            var currUserEmail = this.User.FindFirst("sub")?.Value;
            var board = await _boardService.Create(currUserEmail, input);

            return CreatedAtAction(nameof(GetSingle), new { id = board.Id }, board);
        }

        [Authorize]
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetSingle(Guid id)
        {
            return Ok(await _boardService.GetSingle(id));
        }
    }
}

