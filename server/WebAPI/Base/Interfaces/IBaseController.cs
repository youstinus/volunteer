namespace WebAPI.Base.Interfaces
{
    public interface IBaseController<T, TView> where T : IBaseEntity where TView : IBaseViewModel
    {

    }
}
