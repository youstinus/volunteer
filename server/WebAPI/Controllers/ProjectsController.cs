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
        private readonly IOrganizationsService _organizationsService;
        //todo check for generic repository and methods and change volunteersIds to userIds

        public ProjectsController(IProjectsService service, IOrganizationsService organizationsService) : base(service)
        {
            _projectsService = service;
            _organizationsService = organizationsService;
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

        [HttpGet("popular")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPopularItems()
        {
            try
            {
                var entity = await _projectsService.GetPopularItems();
                return Ok(entity);
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

        [HttpGet("created")]
        [Authorize(Roles = nameof(UserType.Organization))]
        public async Task<IActionResult> GetCreatedItems()
        {
            try
            {
                var entity = await _projectsService.GetCreatedItems(User);
                return Ok(entity);
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost("saved/add/{id}")]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public async Task<IActionResult> AddSavedItem([FromRoute] long id)
        {
            try
            {
                await _projectsService.AddSavedItem(User, id);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost("saved/remove/{id}")]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public async Task<IActionResult> RemoveSavedItem([FromRoute] long id)
        {
            try
            {
                await _projectsService.RemoveSavedItem(User, id);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost("selected/add/{id}")]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public async Task<IActionResult> AddSelectedItem([FromRoute] long id)
        {
            try
            {
                await _projectsService.AddSelectedItem(User, id);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost("selected/remove/{id}")]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public async Task<IActionResult> RemoveSelectedItem([FromRoute] long id)
        {
            try
            {
                await _projectsService.RemoveSelectedItem(User, id);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        /*[HttpGet("saved/{id}/saved")]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public async Task<IActionResult> IsSavedItem([FromRoute] long id)
        {
            try
            {
                var saved = await _projectsService.IsSavedItem(User, id);
                return Ok(saved);
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet("selected/{id}/selected")]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public async Task<IActionResult> IsSelectedItem([FromRoute] long id)
        {
            try
            {
                var selected = await _projectsService.IsSelectedItem(User, id);
                return Ok(selected);
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }*/

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

            return await Task.Run(() => BadRequest("Endpoint not supported"));
            //return await base.Patch(id, patchDto);
        }

        [HttpPost]
        [Authorize(Roles = nameof(UserType.Organization))]
        public override async Task<IActionResult> Post([FromBody] ProjectDto entity)
        {
            try
            {
                if (!ModelState.IsValid || !(await _organizationsService.OrganizationExists(entity)))
                    return BadRequest();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }

            return await base.Post(entity);
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
