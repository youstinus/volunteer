using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Controllers.Interfaces
{
    public interface IVolunteersController : IBaseController<Volunteer, VolunteerDto>
    {
        Task<IActionResult> GetByUsersId([FromRoute]long id);
    }
}
