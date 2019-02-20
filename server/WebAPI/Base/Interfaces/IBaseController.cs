namespace WebAPI.Base.Interfaces
{
    public interface IBaseController<T, TView> where T : IBaseModel where TView : IBaseViewModel
    {
    }
}
