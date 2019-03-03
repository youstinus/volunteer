using WebAPI.Base;
using WebAPI.Base.Interfaces;
using WebAPI.Controllers.Interfaces;
using WebAPI.Models;
using WebAPI.Models.ViewModels;
using WebAPI.Services.Interfaces;

namespace WebAPI.Controllers
{
    public class OrganizationsController : BaseController<Organization, OrganizationViewModel>, IOrganizationsController
    {
        public OrganizationsController(IOrganizationsService service) : base(service)
        {
        }
    }
}
