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
            //var principal = HttpContext.User.Identity as ClaimsIdentity;

            //var login = principal.Claims
            //    .SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
            //    ?.Value;

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
        public IActionResult CreateWorkItem([FromBody]NameDetail nd)
        {
            WorkItem item = _workItemService.Create(nd.name, nd.detail);

            if (item.id == null)
            {
                return BadRequest();
            }

            return Ok(item);
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateWorkItem([FromRoute]string id, [FromBody]NameDetail nd)
        {
            WorkItem item = _workItemService.Get(id);
            if (item == null)
            {
                return NotFound();
            }
            _workItemService.UpdateName(id, nd.name);

            return Ok(_workItemService.UpdateDetail(id, nd.detail));
        }

        [HttpPatch("name/{id}")]
        public IActionResult UpdateName([FromRoute]string id, [FromBody]Text body)
        {
            WorkItem item = _workItemService.Get(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(_workItemService.UpdateName(id, body.text));
        }

        [HttpPatch("detail/{id}")]
        public IActionResult UpdateDetail([FromRoute]string id, [FromBody]Text body)
        {
            WorkItem item = _workItemService.Get(id);
            if (item == null)
            {
                return NotFound();
            }
            
            return Ok(_workItemService.UpdateDetail(id, body.text));
        }

        [HttpDelete]
        public IActionResult DeleteAll()
        {
            _workItemService.Remove();
            return Ok();
        }
    }
}
