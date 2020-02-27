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

        #region CREATE
        [HttpPost]
        public IActionResult Create([FromBody]ProjectMessage projectMessage)
        {
            Project project = _projectService.Create(projectMessage.title, projectMessage.description);

            if(project == null)
            {
                return BadRequest(projectMessage);
            }

            return Ok(project);
        }
        #endregion

        #region READ
        [HttpGet]
        public ActionResult<List<Project>> Get()
        {
            return _projectService.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<Project> Get([FromRoute]string id)
        {
            Project project = _projectService.Get(id);

            if (project == null)
            {
                return NotFound(id);
            }

            return Ok(project);
        }
        #endregion

        #region UPDATE
        [HttpPatch]
        public IActionResult UpdateProject([FromBody]Project updatedProject)
        {
            Project project = _projectService.Get(updatedProject.id);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(_projectService.Update(updatedProject));
        }
        #endregion

        #region DELETE
        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute]string id)
        {
            Project project = _projectService.Get(id);

            if (project == null)
            {
                return NotFound(id);
            }

            _projectService.Remove(id);
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteAll()
        {
            _projectService.Remove();
            return Ok();
        }
        #endregion
    }
}