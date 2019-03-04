﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using WebAPI.Base.Interfaces;
using WebAPI.Services.Interfaces;

namespace WebAPI.Base
{
    public abstract class BaseService<T, TDto> : IBaseService<T, TDto> where T : IBaseEntity where TDto : class, IBaseDto
    {
        protected readonly IBaseRepository<T> _repository;
        protected readonly IMapper _mapper;
        private readonly ITimeService _timeService;

        protected BaseService(
            IBaseRepository<T> repository,
            IMapper mapper,
            ITimeService timeService)
        {
            _repository = repository;
            _mapper = mapper;
            _timeService = timeService;
        }
        public virtual async Task<ICollection<TDto>> GetAll()
        {
            var entities = await _repository.GetAll();
            var mappedDtoList = _mapper.Map<ICollection<TDto>>(entities);
            return mappedDtoList;
        }

        public virtual async Task<TDto> GetById(long id)
        {
            var entity = await _repository.GetById(id);
            if (entity == null)
                throw new InvalidOperationException($"Entity {id} was not found");

            var mappedDto = _mapper.Map<TDto>(entity);
            return mappedDto;
        }

        public virtual async Task<TDto> Create(TDto entityDto)
        {
            if (entityDto == null)
                throw new ArgumentNullException(nameof(entityDto));

            var entity = CreatePoco(entityDto);
            var created = await _repository.Create(entity);
            var mappedDto = _mapper.Map<TDto>(created);
            return mappedDto;
        }
        
        public virtual async Task<bool> Update(long id, TDto entityDto)
        {
            if (entityDto == null)
                throw new ArgumentNullException(nameof(entityDto));

            var itemToUpdate = await _repository.GetById(id);
            if (itemToUpdate == null)
                throw new InvalidOperationException($"Entity {id} was not found");

            _mapper.Map(entityDto, itemToUpdate);
            var updated = await _repository.Update(itemToUpdate);
            return updated;
        }

        public virtual async Task<bool> Patch(long id, JsonPatchDocument<TDto> patchDto)
        {
            if (patchDto == null)
                throw new ArgumentNullException(nameof(patchDto));

            var itemToUpdate = await _repository.GetById(id);
            if (itemToUpdate == null)
                throw new InvalidOperationException($"Entity {id} was not found");

            // this is recommended way from microsoft if you don't have domain model
            //var modificationDate = _timeService.GetCurrentTime();
            var updateData = _mapper.Map<TDto>(itemToUpdate);
            patchDto.ApplyTo(updateData);
            _mapper.Map(updateData, itemToUpdate);
            // itemToUpdate.LastModified = modificationDate;
            var updated = await _repository.Update(itemToUpdate);
            return updated;
        }

        public virtual async Task<bool> Delete(long id)
        {
            var entity = await _repository.GetById(id);
            if (entity == null)
                throw new InvalidOperationException($"Entity {id} was not found");

            var deleted = await _repository.Delete(entity);
            return deleted;
        }

        public T CreatePoco(TDto entityDto)
        {
            //var creationDate = _timeService.GetCurrentTime();
            var entity = _mapper.Map<T>(entityDto);
            /*product.LastModified = creationDate;
            product.Created = creationDate;*/
            return entity;
        }

        public virtual bool ValidateDto(TDto entityDto)
        {
            return entityDto != null;
        }
    }
}
