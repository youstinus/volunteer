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
            return await Task.Run(() => BadRequest("Not supported"));

            /*try
            {
                var entity = await _volunteersService.GetByUsersId(id);
                return Ok(entity);
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }*/
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
        public override async Task<IActionResult> Get()
        {
            return await Task.Run(() => BadRequest("Not supported"));
            //return base.Get();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = /*nameof(UserType.Admin) + "," + nameof(UserType.Moderator) + "," + nameof(UserType.Organization) + "," + */nameof(UserType.Volunteer))]
        public override async Task<IActionResult> GetById([FromRoute] long id)
        {
            if (!ModelState.IsValid)
                return Forbid();

            try
            {
                var entity = await _volunteersService.GetByUser(User, id);
                return Ok(entity);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public override async Task<IActionResult> Patch([FromRoute] long id, [FromBody] JsonPatchDocument<VolunteerDto> patchDto)
        {
            return await Task.Run(() => BadRequest("Not supported"));
            //return base.Patch(id, patchDto);
        }

        [HttpPost]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public override async Task<IActionResult> Post([FromBody] VolunteerDto entity)
        {
            return await Task.Run(() => BadRequest("Not supported"));
            //return base.Post(entity);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public override async Task<IActionResult> Put([FromRoute] long id, [FromBody] VolunteerDto entity)
        {
            if (!ModelState.IsValid || !await _volunteersService.ValidateUserByVolunteersId(User, id))
                return Forbid();

            //return await Task.Run(() => BadRequest("Not supported"));
            return await base.Put(id, entity);
        }

        #endregion
    }
}
