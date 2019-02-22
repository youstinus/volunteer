using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Base;
using WebAPI.Constants;
using WebAPI.Models;
using WebAPI.Models.ViewModels;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/projects")]
    public class ProjectsController : BaseController<Project, ProjectViewModel>
    {
        private readonly ProjectsService _projectsService;

        public ProjectsController(ProjectsService projectsService)
        {
            _projectsService = projectsService;
        }

        [HttpGet("{id}", Name = nameof(Routing.GetProject))]
        [Produces(typeof(Project))]
        public async Task<IActionResult> GetById(int id)
        {
            var project = await _projectsService.GetById(id);
            return Ok(project);
        }

        [HttpPost]
        [Produces(typeof(Project))]
        public async Task<IActionResult> Create([FromBody] Project newProject)
        {
            var created = await _projectsService.Create(newProject);
            var projectUri = CreateResourceUri(created.Id);

            return Created(projectUri, created);
        }

        private Uri CreateResourceUri(int id)
        {
            // ReSharper disable once RedundantAnonymousTypePropertyName
            return new Uri(Url.Link(nameof(Routing.GetProject), new { id = id }));
        }
    }
}
