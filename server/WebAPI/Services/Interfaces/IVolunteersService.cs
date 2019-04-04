using System.Threading.Tasks;
using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Services.Interfaces
{
    public interface IVolunteersService : IBaseService<Volunteer, VolunteerDto>
    {
        Task<VolunteerDto> GetByUsersId(long id);
    }
}
