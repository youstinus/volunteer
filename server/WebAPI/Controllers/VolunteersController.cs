using WebAPI.Base;
using WebAPI.Controllers.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;
using WebAPI.Services.Interfaces;

namespace WebAPI.Controllers
{
    public class VolunteersController : BaseController<Volunteer, VolunteerDto>, IVolunteersController
    {
        public VolunteersController(IVolunteersService service) : base(service)
        {
        }
    }
}
