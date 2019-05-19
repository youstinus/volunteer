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
    public class ReviewsController : BaseController<Review, ReviewDto>, IReviewsController
    {
        private readonly IReviewsService _reviewsService;

        public ReviewsController(IReviewsService service) : base(service)
        {
            _reviewsService = service;
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = nameof(UserType.Moderator) + "," + nameof(UserType.Admin) + "," + nameof(UserType.Volunteer))]
        public override async Task<IActionResult> Delete([FromRoute] long id)
        {
            try
            {
                await _reviewsService.DeleteByUser(User, id);
                return NoContent();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e);
            }
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

        [HttpGet("organization/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByOrganizationId([FromRoute] long id)
        {
            try
            {
                var entity = await _reviewsService.GetByOrganizationId(id);
                return Ok(entity);
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public override async Task<IActionResult> Patch([FromRoute] long id, [FromBody] JsonPatchDocument<ReviewDto> patchDto)
        {
            return await Task.Run(() => BadRequest("Not supported"));
            //return base.Patch(id, patchDto);
        }

        [HttpPost]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public override async Task<IActionResult> Post([FromBody] ReviewDto entity)
        {
            try
            {
                var created = await _reviewsService.CreateByUser(User, entity);
                var entityUri = _service.CreateResourceUri(created.Id);
                return Created(entityUri, created);
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public override async Task<IActionResult> Put([FromRoute] long id, [FromBody] ReviewDto entity)
        {
            try
            {
                await _reviewsService.UpdateByUser(User, id, entity);
                return NoContent();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
