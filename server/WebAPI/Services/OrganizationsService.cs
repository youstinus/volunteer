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

        public override bool ValidateDto(OrganizationDto entity)
        {
            return entity != null
                   && entity.UserId > 0;
            //&& string.IsNullOrWhiteSpace(entity.Title)
            //&& string.IsNullOrWhiteSpace(entity.Description);
        }
    }
}
