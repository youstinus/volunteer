using WebAPI.Base;
using WebAPI.Controllers.Interfaces;
using WebAPI.Models;
using WebAPI.Models.ViewModels;
using WebAPI.Services.Interfaces;

namespace WebAPI.Controllers
{
    public class UsersController : BaseController<User, UserViewModel>, IUsersController
    {
        public UsersController(IUsersService service) : base(service)
        {
        }
    }
}
