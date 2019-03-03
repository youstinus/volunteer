using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Base.Interfaces;

namespace WebAPI.Base
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseController<T, TView> : ControllerBase, IBaseController<T, TView> where T : IBaseEntity where TView : IBaseViewModel
    {
        protected readonly IBaseService<T, TView> _service;
        protected BaseController(IBaseService<T, TView> service)
        {
            _service = service;
        }

        [HttpGet]
        public virtual async Task<IActionResult> GetAll()
        {
            var entities = await _service.GetAll();
            return Ok(entities);
        }

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> GetById([FromRoute] long id)
        {
            var entity = await _service.GetById(id);
            return Ok(entity);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Create([FromBody] TView entity)
        {
            var createdEntity = await _service.Create(entity);
            var entityUri = CreateResourceUri(createdEntity.Id);
            return Created(entityUri, createdEntity);
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Update([FromRoute] long id, [FromBody] TView entity)
        {
            await _service.Update(id, entity);
            return NoContent();
        }

        [HttpPatch("{id}")]
        public virtual async Task<IActionResult> Patch([FromRoute] long id, [FromBody] TView entity)
        {
            await _service.Update(id, entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete([FromRoute] long id)
        {
            await _service.Delete(id);
            return NoContent();
        }

        private Uri CreateResourceUri(long id)
        {
            var url = Url.Link("[controller]", id);
            var uri = new Uri(url);
            return uri;
        }
    }
}
