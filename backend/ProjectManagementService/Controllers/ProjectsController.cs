using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementService.Models;
using ProjectManagementService.Services;

namespace ProjectManagementService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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

        [HttpGet]
        [Route("details/{id}")]
        public IActionResult Get([FromRoute]string id)
        {
            Project project = _projectService.Get(id);

            if (project != null)
            {
                return Ok(project);
            }
            else
            {
                return NotFound();
            }
        }


        [HttpPost]
        [Route("new")]
        //public IActionResult Create([FromBody]TitleDescription ts)
        public IActionResult Create([FromBody]Text title)
        {
            return Ok(_projectService.Create(title.text, "default description"));
        }

        [HttpPost]
        [Route("delete/{projectId}")]
        public IActionResult Delete([FromRoute]string projectId)
        {
            Project project = _projectService.Get(projectId);

            if (project != null)
            {
                _projectService.Remove(projectId);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("add/{projectId}/{boardId}")]
        public IActionResult AddBoard([FromRoute]string projectId, [FromRoute]string boardId)
        {
            Project project = _projectService.Get(projectId);

            if (project != null)
            {
                return Ok(_projectService.AddBoard(projectId, boardId));
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("delete/{projectId}/{boardId}")]
        public IActionResult DeleteBoard([FromRoute]string projectId, [FromRoute]string boardId)
        {
            Project project = _projectService.Get(projectId);

            if (project != null)
            {
                return Ok(_projectService.DeleteBoard(projectId, boardId));
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("update/{projectId}")]
        public IActionResult UpdateProject([FromRoute]string projectId, [FromBody]TitleDescription ts)
        {
            Project project = _projectService.Get(projectId);

            if (project != null)
            {
                _projectService.UpdateTitle(projectId, ts.title);
                return Ok(_projectService.UpdateDescription(projectId, ts.description));
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("title/{projectId}")]
        public IActionResult UpdateTitle([FromRoute]string projectId, [FromBody]Text projectTitle)
        {
            Project project = _projectService.Get(projectId);

            if (project != null)
            {
                return Ok(_projectService.UpdateTitle(projectId, projectTitle.text));
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("description/{projectId}")]
        public IActionResult UpdateDescription([FromRoute]string projectId, [FromBody]Text projectDescription)
        {
            Project project = _projectService.Get(projectId);

            if (project != null)
            {
                return Ok(_projectService.UpdateDescription(projectId, projectDescription.text));
            }
            else
            {
                return NotFound();
            }
        }
    }
}