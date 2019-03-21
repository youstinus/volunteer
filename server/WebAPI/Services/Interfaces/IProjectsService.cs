using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Services.Interfaces
{
    public interface IProjectsService : IBaseService<Project, ProjectDto>
    {
        Task<ICollection<VolunteerDto>> GetVolunteersByProjectId(long id);
        Task<bool> ValidateOrganizationByProjectId(ClaimsPrincipal user, long id);
    }
}
