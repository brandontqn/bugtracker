using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Cors;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
        //[EnableCors("_myAllowSpecificOrigins")]
        public IEnumerable<WorkItem> GetAll()
        {
            return _workItemService.GetAll();
        }

        [HttpGet("{name}")]
        public ActionResult<WorkItem> GetOne(string name)
        {
            WorkItem item = _workItemService.Get(name);
            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpPost]
        //[EnableCors("_myAllowSpecificOrigins")]
        public IActionResult Create([FromBody]NameDetail nameDetail)
        {
            WorkItem item = _workItemService.Create(nameDetail.name, nameDetail.details);

            if (item.id == null)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut("{name}")]
        public IActionResult UpdateWorkItem([FromBody]NameDetail nd)
        {
            WorkItem item = _workItemService.Get(nd.name);
            if (item == null)
            {
                return NotFound();
            }

            _workItemService.Update(nd);
            return Ok();
        }
    }
}
