using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
    public class UsersController : BaseController<User, UserDto>, IUsersController
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService service) : base(service)
        {
            _usersService = service;
        }

        [HttpPost]
        [AllowAnonymous]
        [HttpPost("authenticate", Name = nameof(Routing.Authenticate))] // remove after swagger
        [Route("login")]
        public async Task<IActionResult> Authenticate([FromBody]UserDto userDto)
        {
            if (!ModelState.IsValid || !_usersService.ValidateDto(userDto))
                return BadRequest();

            try
            {
                var user = await _usersService.Authenticate(userDto);
                return Ok(user);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = nameof(UserType.Organization) + "," + nameof(UserType.Volunteer))]
        [HttpPost("deauthenticate", Name = nameof(Routing.Logout))] // remove after swagger
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _usersService.Logout(User);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [HttpPost("registration", Name = nameof(Routing.Register))] // remove after swagger
        [Route("register")]
        public override async Task<IActionResult> Post([FromBody]UserDto userDto)
        {
            if (!ModelState.IsValid || !_usersService.ValidateDto(userDto))
                return BadRequest();

            try
            {
                var created = await _usersService.Create(userDto);
                return CreatedAtRoute(nameof(Routing.Register), created);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Authorize(Roles = nameof(UserType.Admin))]
        public override async Task<IActionResult> Get()
        {
            var users = await _usersService.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = nameof(UserType.Admin))]
        public override async Task<IActionResult> GetById([FromRoute]long id)
        {
            try
            {
                var user = await _usersService.GetById(id);
                return Ok(user);
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = nameof(UserType.Organization) + "," + nameof(UserType.Volunteer))]
        public override async Task<IActionResult> Put([FromRoute]long id, [FromBody]UserDto userDto)
        {
            if (!_usersService.ValidateUser(User, id))
                return Forbid("Cannot update user");

            if (!ModelState.IsValid || !_usersService.ValidateDto(userDto))
                return BadRequest();

            try
            {
                await _usersService.Update(id, userDto);
                return NoContent();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("email/{email}")]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateByEmail([FromRoute]string email, [FromBody]UserDto userDto)
        {
            try
            {
                await _usersService.UpdateByEmail(email, userDto);
                return NoContent();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = nameof(UserType.Organization) + "," + nameof(UserType.Volunteer))]
        public override async Task<IActionResult> Delete([FromRoute]long id)
        {
            if (!_usersService.ValidateUser(User, id))
                return Forbid("Cannot delete user");

            try
            {
                await _usersService.Delete(id);
                return NoContent();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
