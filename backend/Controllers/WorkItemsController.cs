using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using backend.Models;
using backend.Services;

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
        public IEnumerable<WorkItem> GetAll()
        {
            return _workItemService.GetAll();
        }

        [HttpPost]
        public IActionResult Create([FromBody]NameDetail nameDetail)
        {
            WorkItem item = _workItemService.Create(nameDetail.name, nameDetail.details);

            if (item.id == null)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
