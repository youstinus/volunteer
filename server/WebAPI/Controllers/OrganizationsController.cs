using WebAPI.Base;
using WebAPI.Controllers.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;
using WebAPI.Services.Interfaces;

namespace WebAPI.Controllers
{
    public class OrganizationsController : BaseController<Organization, OrganizationDto>, IOrganizationsController
    {
        public OrganizationsController(IOrganizationsService service) : base(service)
        {
        }
    }
}
