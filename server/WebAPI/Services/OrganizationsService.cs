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
    public class OrganizationsService : BaseService<Organization, OrganizationDto>, IOrganizationsService
    {
        public OrganizationsService(
            IOrganizationsRepository repository,
            IMapper mapper,
            ITimeService timeService) : base(repository, mapper, timeService)
        {
        }

        public async Task<bool> ValidateUserByOrganizationsId(ClaimsPrincipal user, long id)
        {
            if (string.IsNullOrWhiteSpace(user.Identity.Name))
                return false;

            var parsed = int.TryParse(user.Identity.Name, out var userId);
            if (!parsed)
                return false;

            var organization = await _repository.GetSingleByPredicate(x => x.User.Id == userId);
            if (organization == null)
                return false;

            return organization.Id == id;
        }
        
        public async Task<bool> OrganizationExists(ProjectDto entity)
        {
            if (entity == null || entity.OrganizationId < 0)
                return false;

            var organization = await _repository.GetById(entity.OrganizationId);
            return organization != null;
        }

        public override bool ValidateDto(OrganizationDto entity)
        {
            return entity != null
                   && entity.UserId > 0;
            //&& string.IsNullOrWhiteSpace(entity.Title)
            //&& string.IsNullOrWhiteSpace(entity.Description);
        }
    }
}
