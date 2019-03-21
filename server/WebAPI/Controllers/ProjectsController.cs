using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Base;
using WebAPI.Controllers.Interfaces;
using WebAPI.Enums;
using WebAPI.Models;
using WebAPI.Models.DTO;
using WebAPI.Services.Interfaces;

namespace WebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : BaseController<Project, ProjectDto>, IProjectsController
    {
        private readonly IProjectsService _projectsService;
        public ProjectsController(IProjectsService service) : base(service)
        {
            _projectsService = service;
        }
        
        [HttpGet("{id}/volunteers")]
        [Authorize(Roles = nameof(UserType.Organization))]
        public async Task<IActionResult> GetVolunteersByProjectId([FromRoute] long id)
        {
            if (!(await _projectsService.ValidateOrganizationByProjectId(User, id)))
                return Forbid();

            try
            {
                var entities = await _projectsService.GetVolunteersByProjectId(id);
                return Ok(entities);
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        #region CRUD

        [HttpDelete("{id}")]
        [Authorize(Roles = nameof(UserType.Organization))]
        public override Task<IActionResult> Delete([FromRoute] long id)
        {
            return base.Delete(id);
        }

        [HttpGet]
        [AllowAnonymous]
        public override Task<IActionResult> Get()
        {
            return base.Get();
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public override Task<IActionResult> GetById([FromRoute] long id)
        {
            return base.GetById(id);
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = nameof(UserType.Organization))]
        public override Task<IActionResult> Patch([FromRoute] long id, [FromBody] JsonPatchDocument<ProjectDto> patchDto)
        {
            return base.Patch(id, patchDto);
        }

        [HttpPost]
        [Authorize(Roles = nameof(UserType.Organization))]
        public override Task<IActionResult> Post([FromBody] ProjectDto entity)
        {
            return base.Post(entity);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = nameof(UserType.Organization))]
        public override Task<IActionResult> Put([FromRoute] long id, [FromBody] ProjectDto entity)
        {
            return base.Put(id, entity);
        }

        #endregion
    }
}
