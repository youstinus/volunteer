using WebAPI.Base.Interfaces;

namespace WebAPI.Base
{
    public abstract class BaseViewModel : IBaseViewModel
    {
        public int Id { get; set; }
    }
}
