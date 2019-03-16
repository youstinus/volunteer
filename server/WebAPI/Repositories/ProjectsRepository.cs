using System.Linq;
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

        protected override IQueryable<Project> IncludeDependencies(IQueryable<Project> queryable)
        {
            var dependencies = queryable
                .Include(x => x.Organization)
                .Include(x => x.Pictures)
                .Include(x => x.ProjectVolunteers)
                .ThenInclude(x => x.Volunteer);
            return dependencies;
        }
    }
}
