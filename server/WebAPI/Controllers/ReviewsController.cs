using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Base;
using WebAPI.Base.Interfaces;
using WebAPI.Controllers.Interfaces;
using WebAPI.Enums;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : BaseController<Review, ReviewDto>, IReviewsController
    {
        public ReviewsController(IBaseService<Review, ReviewDto> service) : base(service)
        {
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = nameof(UserType.Moderator) + "," + nameof(UserType.Admin))]
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
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public override Task<IActionResult> Patch([FromRoute] long id, [FromBody] JsonPatchDocument<ReviewDto> patchDto)
        {
            return base.Patch(id, patchDto);
        }

        [HttpPost]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public override Task<IActionResult> Post([FromBody] ReviewDto entity)
        {
            return base.Post(entity);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = nameof(UserType.Volunteer))]
        public override Task<IActionResult> Put([FromRoute] long id, [FromBody] ReviewDto entity)
        {
            return base.Put(id, entity);
        }
    }
}
