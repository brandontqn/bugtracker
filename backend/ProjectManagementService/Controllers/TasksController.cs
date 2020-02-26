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

        #region CREATE
        [HttpPost]
        public IActionResult CreateTask([FromBody]TaskMessage task)
        {
            Task item = _taskService.Create(task.title, task.description, task.time, task.boardId, task.tags);

            if (item.id == null)
            {
                return BadRequest();
            }

            return Ok(item);
        }
        #endregion

        #region READ
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

        [HttpGet("/filter/tags")]
        public IEnumerable<Task> GetSome([FromBody]Tags tags)
        {
            return _taskService.GetAll().Where(task => tags.tags.All(tag => task.tags.Contains(tag)));
        }
        #endregion

        #region UPDATE
        [HttpPatch]
        public IActionResult UpdateTask([FromBody]Task updatedTask)
        {
            Task item = _taskService.Get(updatedTask.id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(_taskService.Update(updatedTask));
        }
        #endregion

        #region DELETE
        [HttpDelete("{id}")]
        public IActionResult DeleteOne([FromRoute]string id)
        {
            Task item = _taskService.Get(id);

            if (item == null)
            {
                return NotFound(id);
            }

            _taskService.Remove(id);
            return Ok(id);
        }

        [HttpDelete]
        public IActionResult DeleteAll()
        {
            _taskService.Remove();
            return Ok();
        }
        #endregion
    }
}
