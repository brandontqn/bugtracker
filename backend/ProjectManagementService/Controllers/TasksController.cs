using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using ProjectManagementService.Models;
using ProjectManagementService.Services;

using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace ProjectManagementService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly ILogger<TasksController> _logger;

        private readonly TaskService _taskService;

        public TasksController(ILogger<TasksController> logger, TaskService service)
        {
            _logger = logger;
            _taskService = service;
        }

        [HttpGet]
        public IEnumerable<Task> GetAll()
        {
            return _taskService.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<Task> GetOne([FromRoute]string id)
        {
            Task item = _taskService.Get(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpPost]
        public IActionResult CreateTask([FromBody]TitleDescriptionTime titleDescriptionTime)
        {
            Task item = _taskService.Create(titleDescriptionTime.title, titleDescriptionTime.description, titleDescriptionTime.time, null); // boordId null to start...

            if (item.id == null)
            {
                return BadRequest();
            }

            return Ok(item);
        }

        [HttpPatch]
        public IActionResult UpdateTask([FromBody]Task newTask)
        {
            Task item = _taskService.Get(newTask.id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(_taskService.Update(newTask));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOne([FromRoute]string id)
        {
            Task item = _taskService.Get(id);
            if (item == null)
            {
                return NotFound(id);
            }

            _taskService.Remove(id);
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteAll()
        {
            _taskService.Remove();
            return Ok();
        }
    }
}
