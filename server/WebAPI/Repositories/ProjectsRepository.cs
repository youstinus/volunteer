using Microsoft.EntityFrameworkCore;
using WebAPI.Base;
using WebAPI.Configurations;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;

namespace WebAPI.Repositories
{
    public class ProjectsRepository : BaseRepository<Project>, IProjectsRepository
    {
        protected override DbSet<Project> ItemSet { get; }
        public ProjectsRepository(VolunteerDbContext context) : base(context)
        {
            ItemSet = context.Projects;
        }
    }
}
