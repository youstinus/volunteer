using System.Security.Claims;
using System.Threading.Tasks;
using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Services.Interfaces
{
    public interface IOrganizationsService : IBaseService<Organization, OrganizationDto>
    {
        Task<bool> ValidateUserByOrganizationsId(ClaimsPrincipal user, long id);
        Task<bool> OrganizationExists(ProjectDto entity);
        Task<OrganizationDto> GetByUser(ClaimsPrincipal user, long id);
    }
}
