using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using WebAPI.Base.Interfaces;

namespace WebAPI.Base
{
    public abstract class BaseService<T, TView> : IBaseService<T, TView> where T : IBaseEntity where TView: IBaseViewModel
    {
        protected readonly IBaseRepository<T> _repository;
        protected readonly IMapper _mapper;
        protected BaseService(IBaseRepository<T> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public async Task<ICollection<TView>> GetAll()
        {
            var entities = await _repository.GetAll();
            var mappedEntities = _mapper.Map<ICollection<TView>>(entities);
            return mappedEntities;
        }

        public async Task<TView> GetById(long id)
        {
            var entity = await _repository.GetById(id);
            var mapped = _mapper.Map<TView>(entity);
            return mapped;
        }

        public async Task<TView> Create(TView entityView)
        {
            var entity = _mapper.Map<T>(entityView);
            var created = await _repository.Create(entity);
            var mappedCreated = _mapper.Map<TView>(created);
            return mappedCreated;
        }
        
        public async Task Update(long id, TView entityView)
        {
            var entity = _mapper.Map<T>(entityView);
            entity.Id = id;
            await _repository.Update(entity);
        }

        public async Task Patch(long id, TView entityView)
        {
            var entity = _mapper.Map<T>(entityView);
            entity.Id = id;
            await _repository.Patch(entity);
        }

        public async Task Delete(long id)
        {
            var entity = await _repository.GetById(id);
            await _repository.Delete(entity);
        }
    }
}
