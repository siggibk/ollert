using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using OllertServer.Services.Interfaces;
using OllertServer.Models.Dtos;
using OllertServer.Models.InputModels;

namespace OllertServer.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColumnsController : ControllerBase
    {
        private IColumnService _columnService;

        public ColumnsController(IColumnService columnService)
        {
            _columnService = columnService;
        }

        [Authorize]
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetSingle(Guid id)
        {
            return Ok(await _columnService.GetSingle(id));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ColumnInputModel input)
        {
            var column = await _columnService.Create(input);

            return CreatedAtAction(nameof(GetSingle), new { id = column.Id }, column);
        }

        [Authorize]
        [HttpPatch("{id:guid}")]
        public async Task<IActionResult> Update([FromBody] ColumnUpdateDto input, Guid id)
        {
            await _columnService.Update(id, input);
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _columnService.Delete(id);
            return NoContent();
        }
    }
}