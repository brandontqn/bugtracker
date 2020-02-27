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
        public ActionResult<Task> CreateTask([FromBody]TaskMessage taskMessage)
        {
            Task task = _taskService.Create(taskMessage.title, taskMessage.description, taskMessage.time, taskMessage.currentBoardId, taskMessage.tags);

            if (task == null)
            {
                return BadRequest();
            }

            return Ok(task);
        }
        #endregion

        #region READ
        [HttpGet]
        public ActionResult<List<Task>> GetAll()
        {
            return Ok(_taskService.GetAll());
        }

        [HttpGet("{id}")]
        public ActionResult<Task> GetOne([FromRoute]string id)
        {
            Task task = _taskService.Get(id);

            if (task == null)
            {
                return NotFound(id);
            }

            return Ok(task);
        }

        [HttpGet("/filter/tags")]
        public ActionResult<List<Task>> GetSome([FromBody]Tags tags)
        {
            return Ok(_taskService.GetAll().Where(task => tags.tags.All(tag => task.tags.Contains(tag))));
        }
        #endregion

        #region UPDATE
        [HttpPatch]
        public ActionResult<Task> UpdateTask([FromBody]Task updatedTask)
        {
            Task task = _taskService.Get(updatedTask.id);

            if (task == null)
            {
                return NotFound(updatedTask);
            }

            return Ok(_taskService.Update(updatedTask));
        }
        #endregion

        #region DELETE
        [HttpDelete("{id}")]
        public IActionResult DeleteOne([FromRoute]string id)
        {
            Task task = _taskService.Get(id);

            if (task == null)
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
        #endregion
    }
}
