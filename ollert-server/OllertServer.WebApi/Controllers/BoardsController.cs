using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using OllertServer.Services.Interfaces;

namespace OllertServer.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardsController : ControllerBase
    {
        private IBoardService BoardService { get; }
        public BoardsController(IBoardService boardService)
        {
            BoardService = boardService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await BoardService.GetAll());
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetSingle(Guid id)
        {
            return Ok(await BoardService.GetSingle(id));
        }
    }
}

