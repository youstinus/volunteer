using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch;

namespace WebAPI.Base.Interfaces
{
    public interface IBaseService<T, TDto> where T : IBaseEntity where TDto: class, IBaseDto
    {
        Task<ICollection<TDto>> GetAll();
        Task<TDto> Create(TDto entityDto);
        Task<TDto> GetById(long id);
        Task<bool> Update(long id, TDto entityDto);
        Task<bool> Patch(long id, JsonPatchDocument<TDto> patchDto);
        Task<bool> Delete(long id);
        bool ValidateDto(TDto entityDto);
    }
}
