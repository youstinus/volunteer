using AutoMapper;
using WebAPI.Base;
using WebAPI.Models;
using WebAPI.Models.ViewModels;
using WebAPI.Repositories.Interfaces;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services
{
    public class OrganizationsService : BaseService<Organization, OrganizationViewModel>, IOrganizationsService
    {
        public OrganizationsService(IOrganizationsRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
