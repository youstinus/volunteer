using Microsoft.AspNetCore.Mvc;
using WebAPI.Base;
using WebAPI.Controllers.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;
using WebAPI.Services.Interfaces;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class ProjectsController : BaseController<Project, ProjectDto>, IProjectsController
    {
        public ProjectsController(IProjectsService service) : base(service)
        {
        }
    }
}
