﻿using System;
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
    public class WorkItemsController : ControllerBase
    {
        private readonly ILogger<WorkItemsController> _logger;

        private readonly WorkItemService _workItemService;

        public WorkItemsController(ILogger<WorkItemsController> logger, WorkItemService service)
        {
            _logger = logger;
            _workItemService = service;
        }

        [HttpGet]
        public IEnumerable<WorkItem> GetAll()
        {
            return _workItemService.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<WorkItem> GetOne([FromRoute]string id)
        {
            WorkItem item = _workItemService.Get(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpPost]
        public IActionResult CreateWorkItem([FromBody]NameDetailTime nd)
        {
            WorkItem item = _workItemService.Create(nd.name, nd.detail, nd.time, null); // boordId null to start...

            if (item.id == null)
            {
                return BadRequest();
            }

            return Ok(item);
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateWorkItem([FromRoute]string id, [FromBody]WorkItem newItem)
        {
            WorkItem item = _workItemService.Get(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(_workItemService.UpdateItem(newItem));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOne([FromRoute]string id)
        {
            WorkItem item = _workItemService.Get(id);
            if (item == null)
            {
                return NotFound(id);
            }

            _workItemService.Remove(id);
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteAll()
        {
            _workItemService.Remove();
            return Ok();
        }
    }
}
