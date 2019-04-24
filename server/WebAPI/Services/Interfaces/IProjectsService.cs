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
        Task<ICollection<ProjectDto>> GetSavedItems(ClaimsPrincipal user);
        Task<ICollection<ProjectDto>> GetSelectedItems(ClaimsPrincipal user);
        Task<ICollection<ProjectDto>> GetCreatedItems(ClaimsPrincipal user);
        Task AddSavedItem(ClaimsPrincipal user, long id);
        Task RemoveSavedItem(ClaimsPrincipal user, long id);
        Task AddSelectedItem(ClaimsPrincipal user, long id);
        Task RemoveSelectedItem(ClaimsPrincipal user, long id);
        Task<bool> IsSavedItem(ClaimsPrincipal user, long id);
        Task<bool> IsSelectedItem(ClaimsPrincipal user, long id);
    }
}
