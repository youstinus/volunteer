using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebAPI.Base.Interfaces
{
    public interface IBaseRepository<T> where T: IBaseEntity
    {
        Task<ICollection<T>> GetAll();
        Task<T> GetById(long id);
        Task<T> Create(T entity);
        Task Update(T entity);
        Task Patch(T entity);
        Task Delete(T entity);
    }
}
