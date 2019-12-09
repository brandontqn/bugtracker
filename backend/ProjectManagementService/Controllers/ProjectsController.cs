using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementService.Models;
using ProjectManagementService.Services;

namespace ProjectManagementService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ProjectsController : ControllerBase
    {
        private readonly ProjectService _projectService;

        public ProjectsController(ProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<Project> projects;
            try
            {
                projects = _projectService.GetAll();
            }
            catch
            {
                projects = new List<Project>();
            }

            return Ok(projects);
        }

        [HttpPost]
        [Route("new")]
        public IActionResult Create([FromBody]TitleDescription ts)
        {
            return Ok(_projectService.Create(ts.title, ts.description));
        }

        [HttpPost]
        [Route("delete/{id}")]
        public IActionResult Delete([FromRoute]string id)
        {
            Project project = _projectService.Get(id);

            if (project != null)
            {
                _projectService.Remove(id);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}