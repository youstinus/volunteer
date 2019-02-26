using WebAPI.Base.Interfaces;

namespace WebAPI.Base
{
    public abstract class BaseEntity : IBaseEntity
    {
        public long Id { get; set; }
    }
}
