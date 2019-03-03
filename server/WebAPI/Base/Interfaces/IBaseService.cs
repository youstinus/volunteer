using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebAPI.Base.Interfaces
{
    public interface IBaseService<T, TView> where T : IBaseEntity where TView: IBaseViewModel
    {
        Task<ICollection<TView>> GetAll();
        Task<TView> Create(TView entityView);
        Task<TView> GetById(long id);
        Task Update(long id, TView entityView);
        Task Patch(long id, TView entityView);
        Task Delete(long id);
    }
}
