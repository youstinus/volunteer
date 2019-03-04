using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Base.Interfaces;

namespace WebAPI.Base
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseController<T, TDto> : ControllerBase, IBaseController<T, TDto> where T : class, IBaseEntity where TDto : class, IBaseDto
    {
        protected readonly IBaseService<T, TDto> _service;

        protected BaseController(IBaseService<T, TDto> service)
        {
            _service = service;
        }
        
        [HttpGet]
        public virtual async Task<IActionResult> Get()
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
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost]
        public virtual async Task<IActionResult> Post([FromBody] TDto entity)
        {
            if (!ModelState.IsValid && !_service.ValidateDto(entity))
                return BadRequest();

            try
            {
                var createdEntity = await _service.Create(entity);
                var entityUri = CreateResourceUri(createdEntity.Id);
                return Created(entityUri, createdEntity);
            }
            catch (ArgumentNullException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Put([FromRoute] long id, [FromBody] TDto entity)
        {
            if (!ModelState.IsValid && !_service.ValidateDto(entity))
                return BadRequest();

            try
            {
                await _service.Update(id, entity);
                return NoContent();
            }
            catch (ArgumentNullException e)
            {
                return BadRequest(e.Message);
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPatch("{id}")]
        public virtual async Task<IActionResult> Patch([FromRoute] long id, [FromBody] JsonPatchDocument<TDto> patchDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            try
            {
                await _service.Patch(id, patchDto);
                return NoContent();
            }
            catch (ArgumentNullException e)
            {
                return BadRequest(e.Message);
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete([FromRoute] long id)
        {
            try
            {
                await _service.Delete(id);
                return NoContent();
            }
            catch (InvalidOperationException e)
            {
                return NotFound(e.Message);
            }
        }

        private Uri CreateResourceUri(long id)
        {
            return new Uri($"{Request.Path}/{id}", UriKind.Relative);
        }
    }
}
