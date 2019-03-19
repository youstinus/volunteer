using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Base;
using WebAPI.Base.Interfaces;
using WebAPI.Controllers.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PicturesController : BaseController<Picture, PictureDto>, IPicturesController
    {
        public PicturesController(IBaseService<Picture, PictureDto> service) : base(service)
        {
        }
        
        [HttpDelete("{id}")]
        [AllowAnonymous]
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
        [AllowAnonymous]
        public override Task<IActionResult> Patch([FromRoute] long id, [FromBody] JsonPatchDocument<PictureDto> patchDto)
        {
            return base.Patch(id, patchDto);
        }

        [HttpPost]
        [AllowAnonymous]
        public override Task<IActionResult> Post([FromBody] PictureDto entity)
        {
            return base.Post(entity);
        }

        [HttpPut("{id}")]
        [AllowAnonymous]
        public override Task<IActionResult> Put([FromRoute] long id, [FromBody] PictureDto entity)
        {
            return base.Put(id, entity);
        }
    }
}
