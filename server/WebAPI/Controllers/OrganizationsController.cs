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
    public class OrganizationsController : BaseController<Organization, OrganizationDto>, IOrganizationsController
    {
        private readonly IOrganizationsService _organizationsService;

        public OrganizationsController(IOrganizationsService service) : base(service)
        {
            _organizationsService = service;
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = nameof(UserType.Organization))]
        public override async Task<IActionResult> Delete([FromRoute] long id)
        {
            return await Task.Run(() => BadRequest("Endpoint not supported"));//base.Delete(id));
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

        [HttpGet("user/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByUserId([FromRoute] long id)
        {
            if (!ModelState.IsValid)
                return Forbid();

            try
            {
                var entity = await _organizationsService.GetByUser(User, id);
                return Ok(entity);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = nameof(UserType.Organization))]
        public override async Task<IActionResult> Patch([FromRoute] long id, [FromBody] JsonPatchDocument<OrganizationDto> patchDto)
        {
            if (!ModelState.IsValid || !await _organizationsService.ValidateUserByOrganizationsId(User, id))
                return Forbid();

            return BadRequest("Endpoint not supported");
            //return await base.Patch(id, patchDto);
        }

        [HttpPost]
        [Authorize(Roles = nameof(UserType.Organization))]
        public override async Task<IActionResult> Post([FromBody] OrganizationDto entity)
        {
            return await Task.Run(() => BadRequest("Endpoint not supported"));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = nameof(UserType.Organization))]
        public override async Task<IActionResult> Put([FromRoute] long id, [FromBody] OrganizationDto entity)
        {
            if (!ModelState.IsValid || !await _organizationsService.ValidateUserByOrganizationsId(User, id))
                return Forbid();

            return await base.Put(id, entity);
        }
    }
}
