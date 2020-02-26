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
        public IActionResult Create([FromBody]ProjectMessage project)
        {
            return Ok(_projectService.Create(project.title, project.description));
        }
        #endregion

        #region READ
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

        [HttpGet("{id}")]
        public IActionResult Get([FromRoute]string id)
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
        [HttpPatch("{id}")]
        public IActionResult UpdateProject([FromRoute]string id, [FromBody]Project updatedProject)
        {
            Project project = _projectService.Get(id);

            if (project == null)
            {
                return NotFound(id);
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
            return Ok(id);
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