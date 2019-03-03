using System;
using System.Threading.Tasks;
using AutoMapper;
using WebAPI.Base;
using WebAPI.Models;
using WebAPI.Models.ViewModels;
using WebAPI.Repositories.Interfaces;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services
{
    public class ProjectsService : BaseService<Project, ProjectViewModel>, IProjectsService
    {
        public ProjectsService(IProjectsRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public async Task<Project> GetById(int id)
        {
            var project = await _repository.GetById(id);
            return project;
        }

        public async Task<Project> Create(Project item)
        {
            if (item == null) throw new ArgumentNullException(nameof(item));
            var created = await _repository.Create(item);
            return created;
        }
    }
}
