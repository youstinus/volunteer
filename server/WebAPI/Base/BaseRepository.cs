using WebAPI.Base.Interfaces;

namespace WebAPI.Base
{
    public class BaseRepository<T> : IBaseRepository<T> where T : IBaseModel
    {
    }
}
