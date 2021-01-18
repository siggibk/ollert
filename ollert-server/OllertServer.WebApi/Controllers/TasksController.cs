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
    public class TasksController : ControllerBase
    {
        private ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [Authorize]
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetSingle(Guid id)
        {
            return Ok(await _taskService.GetSingle(id));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskInputModel input)
        {
            var task = await _taskService.Create(input);

            return CreatedAtAction(nameof(GetSingle), new { id = task.Id }, task);
        }

        [Authorize]
        [HttpPatch("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] TaskUpdateDto input)
        {
            await _taskService.Update(id, input);
            return NoContent();
        }
    }
}