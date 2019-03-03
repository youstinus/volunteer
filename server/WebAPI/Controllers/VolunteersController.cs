using WebAPI.Base;
using WebAPI.Controllers.Interfaces;
using WebAPI.Models;
using WebAPI.Models.ViewModels;
using WebAPI.Services.Interfaces;

namespace WebAPI.Controllers
{
    public class VolunteersController : BaseController<Volunteer, VolunteerViewModel>, IVolunteersController
    {
        public VolunteersController(IVolunteersService service) : base(service)
        {
        }
    }
}
