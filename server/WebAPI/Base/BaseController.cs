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
            try
            {
                var entity = await _service.GetById(id);
                return Ok(entity);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public virtual async Task<IActionResult> Create([FromBody] TView entity)
        {
            if (!ModelState.IsValid && !_service.ValidateViewModel(entity))
                return BadRequest();

            try
            {
                var createdEntity = await _service.Create(entity);
                var entityUri = CreateResourceUri(createdEntity.Id);
                return Created(entityUri, createdEntity);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Update([FromRoute] long id, [FromBody] TView entity)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            try
            {
                await _service.Update(id, entity);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPatch("{id}")]
        public virtual async Task<IActionResult> Patch([FromRoute] long id, [FromBody] TView entity)
        {
            /*if (!ModelState.IsValid)
                return BadRequest();

            await _service.Patch(id, entity);
            return NoContent();*/
            return BadRequest("Patch is not working at this moment! Use PUT instead.");
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete([FromRoute] long id)
        {
            try
            {
                await _service.Delete(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        private Uri CreateResourceUri(long id)
        {
            return new Uri($"{Request.Path}/{id}", UriKind.Relative);
        }
    }
}
