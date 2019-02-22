using WebAPI.Base.Interfaces;

namespace WebAPI.Base
{
    public abstract class BaseEntity : IBaseEntity
    {
        public int Id { get; set; }
    }
}
