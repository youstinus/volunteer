using Microsoft.AspNetCore.Mvc;
using WebAPI.Base.Interfaces;

namespace WebAPI.Base
{
    public class BaseController<T, TView> : ControllerBase, IBaseController<T, TView> where T : IBaseEntity where TView : IBaseViewModel
    {
    }
}
