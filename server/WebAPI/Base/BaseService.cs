using WebAPI.Base.Interfaces;

namespace WebAPI.Base
{
    public class BaseService<T> : IBaseService<T> where T: IBaseEntity
    {
    }
}
