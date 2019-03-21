using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using WebAPI.Base;
using WebAPI.Models;
using WebAPI.Models.DTO;
using WebAPI.Repositories.Interfaces;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services
{
    public class VolunteersService : BaseService<Volunteer, VolunteerDto>, IVolunteersService
    {
        public VolunteersService(
            IVolunteersRepository repository,
            IMapper mapper,
            ITimeService timeService) : base(repository, mapper, timeService)
        {
        }

        public override bool ValidateDto(VolunteerDto entity)
        {
            return entity != null
                   && string.IsNullOrWhiteSpace(entity.FirstName)
                   && string.IsNullOrWhiteSpace(entity.LastName);
        }
    }
}
