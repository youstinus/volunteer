using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.ViewModels;

namespace WebAPI.Services.Interfaces
{
    public interface IProjectsService : IBaseService<Project, ProjectViewModel>
    {
    }
}
