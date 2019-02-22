using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.Services
{
    public class ProjectsService
    {
        private readonly ProjectsRepository _repository;

        public ProjectsService(ProjectsRepository repository)
        {
            _repository = repository;
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
