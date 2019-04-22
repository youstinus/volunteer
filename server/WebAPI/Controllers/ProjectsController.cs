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

        [HttpGet("saved")]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public async Task<IActionResult> GetSavedItems()
        {
            try
            {
                var entity = await _projectsService.GetSavedItems(User);
                return Ok(entity);
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet("selected")]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public async Task<IActionResult> GetSelectedItems()
        {
            try
            {
                var entity = await _projectsService.GetSelectedItems(User);
                return Ok(entity);
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        #region CRUD

        [HttpDelete("{id}")]
        [Authorize(Roles = nameof(UserType.Organization))]
        public override async Task<IActionResult> Delete([FromRoute] long id)
        {
            if (!(await _projectsService.ValidateOrganizationByProjectId(User, id)))
                return Forbid();

            return await base.Delete(id);
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
        public override async Task<IActionResult> Patch([FromRoute] long id, [FromBody] JsonPatchDocument<ProjectDto> patchDto)
        {
            if (!(await _projectsService.ValidateOrganizationByProjectId(User, id)))
                return Forbid();

            return await base.Patch(id, patchDto);
        }

        [HttpPost]
        [Authorize(Roles = nameof(UserType.Organization))]
        public override Task<IActionResult> Post([FromBody] ProjectDto entity)
        {
            return base.Post(entity);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = nameof(UserType.Organization))]
        public override async Task<IActionResult> Put([FromRoute] long id, [FromBody] ProjectDto entity)
        {
            if (!(await _projectsService.ValidateOrganizationByProjectId(User, id)))
                return Forbid();

            return await base.Put(id, entity);
        }

        #endregion
    }
}
