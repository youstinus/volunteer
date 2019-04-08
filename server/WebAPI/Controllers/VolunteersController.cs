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
    public class VolunteersController : BaseController<Volunteer, VolunteerDto>, IVolunteersController
    {
        private readonly IVolunteersService _volunteersService;
        public VolunteersController(IVolunteersService service) : base(service)
        {
            _volunteersService = service;
        }
        
        [HttpGet("users/{id}")]
        [Authorize(Roles = nameof(UserType.Admin) + "," + nameof(UserType.Moderator) + "," + nameof(UserType.Organization) + "," + nameof(UserType.Volunteer))]
        public async Task<IActionResult> GetByUsersId([FromRoute] long id)
        {
            try
            {
                var entity = await _volunteersService.GetByUsersId(id);
                return Ok(entity);
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        #region CRUD

        [HttpDelete("{id}")]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public override Task<IActionResult> Delete([FromRoute] long id)
        {
            return base.Delete(id);
        }

        [HttpGet]
        [Authorize(Roles = nameof(UserType.Admin) + "," + nameof(UserType.Moderator) + "," + nameof(UserType.Organization))]
        public override Task<IActionResult> Get()
        {
            return base.Get();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = nameof(UserType.Admin) + "," + nameof(UserType.Moderator) + "," + nameof(UserType.Organization) + "," + nameof(UserType.Volunteer))]
        public override Task<IActionResult> GetById([FromRoute] long id)
        {
            return base.GetById(id);
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public override Task<IActionResult> Patch([FromRoute] long id, [FromBody] JsonPatchDocument<VolunteerDto> patchDto)
        {
            return base.Patch(id, patchDto);
        }

        [HttpPost]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public override Task<IActionResult> Post([FromBody] VolunteerDto entity)
        {
            return base.Post(entity);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public override Task<IActionResult> Put([FromRoute] long id, [FromBody] VolunteerDto entity)
        {
            return base.Put(id, entity);
        }

        #endregion
    }
}
