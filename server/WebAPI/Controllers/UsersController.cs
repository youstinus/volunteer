using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Base;
using WebAPI.Controllers.Interfaces;
using WebAPI.Entities;
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

        [AllowAnonymous]
        [HttpPost("authenticate")]
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

        [AllowAnonymous]
        [HttpPost("register", Name = nameof(Post))]
        public override async Task<IActionResult> Post([FromBody]UserDto userDto)
        {
            if (!ModelState.IsValid || !_usersService.ValidateDto(userDto))
                return BadRequest();

            try
            {
                var created = await _usersService.Create(userDto);
                //var uri = _usersService.CreateResourceUri(created.Id);
                return CreatedAtRoute(nameof(Post), created);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Authorize(Roles = Role.Admin)]
        public override async Task<IActionResult> Get()
        {
            var users = await _usersService.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
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
        public override async Task<IActionResult> Put(long id, [FromBody]UserDto userDto)
        {
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

        [HttpDelete("{id}")]
        public override async Task<IActionResult> Delete(long id)
        {
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
