using System;
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

        public async Task<VolunteerDto> GetByUsersId(long id)
        {
            var volunteer = await _repository.GetSingleByPredicate(x => x.User.Id == id);
            var mapped = _mapper.Map<VolunteerDto>(volunteer);
            return mapped;
        }

        public async Task<VolunteerDto> GetByUser(ClaimsPrincipal user, long id)
        {
            if (!user.Identity.IsAuthenticated || user.Identity.Name != id.ToString())
                throw new InvalidOperationException("Not authenticated");

            var volunteer = await _repository.GetSingleByPredicate(x => x.User.Id == id);
            if (volunteer == null)
                throw new InvalidOperationException("Volunteer not found");

            var mapped = _mapper.Map<VolunteerDto>(volunteer);
            return mapped;
        }

        public async Task<bool> ValidateUserByVolunteersId(ClaimsPrincipal user, long id)
        {
            if (string.IsNullOrWhiteSpace(user.Identity.Name))
                return false;

            var parsed = int.TryParse(user.Identity.Name, out var userId);
            if (!parsed)
                return false;

            var volunteer = await _repository.GetSingleByPredicate(x => x.User.Id == userId);
            if (volunteer == null)
                return false;

            return volunteer.Id == id;
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
