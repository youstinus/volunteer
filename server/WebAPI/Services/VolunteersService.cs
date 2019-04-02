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

        public async Task<VolunteerDto> GetByUsersId(long id)
        {
            var volunteer = await _repository.GetSingleByPredicate(x => x.User.Id == id);
            var mapped = _mapper.Map<VolunteerDto>(volunteer);
            return mapped;
        }

        public override bool ValidateDto(VolunteerDto entity)
        {
            return entity != null
                   && entity.UserId > 0;
            //&& string.IsNullOrWhiteSpace(entity.FirstName)
            //&& string.IsNullOrWhiteSpace(entity.LastName);
        }
    }
}
