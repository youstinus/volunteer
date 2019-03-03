using AutoMapper;
using WebAPI.Base;
using WebAPI.Models;
using WebAPI.Models.ViewModels;
using WebAPI.Repositories.Interfaces;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services
{
    public class VolunteersService : BaseService<Volunteer, VolunteerViewModel>, IVolunteersService
    {
        public VolunteersService(IVolunteersRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
