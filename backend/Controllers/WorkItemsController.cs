using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkItemsController : ControllerBase
    {
        public static WorkItem[] workItems = new WorkItem[]
        {
            new WorkItem() { id = "1", name = "Bug 1", details = "There is a major bug!" },
            new WorkItem() { id = "2", name = "Bug 2", details = "There is a major bug!!" },
            new WorkItem() { id = "3", name = "Bug 3", details = "There is a major bug!!!" }
        };

        private readonly ILogger<WorkItemsController> _logger;

        public WorkItemsController(ILogger<WorkItemsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WorkItem> Get()
        {
            return workItems;
        }
    }
}
