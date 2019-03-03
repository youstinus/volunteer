using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.ViewModels;

namespace WebAPI.Controllers.Interfaces
{
    public interface IVolunteersController : IBaseController<Volunteer, VolunteerViewModel>
    {
    }
}
