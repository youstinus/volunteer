using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebAPI.Base;
using WebAPI.Configurations;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;

namespace WebAPI.Repositories
{
    public class VolunteersRepository : BaseRepository<Volunteer>, IVolunteersRepository
    {
        protected override DbSet<Volunteer> ItemSet { get; }

        public VolunteersRepository(VolunteerDbContext context) : base(context)
        {
            ItemSet = context.Volunteers;
        }

        protected override IQueryable<Volunteer> IncludeDependencies(IQueryable<Volunteer> queryable)
        {
            var dependencies = queryable
                .Include(x => x.User)
                .Include(x => x.Picture)
                .Include(x => x.Reviews)
                .Include(x => x.VolunteerProjects)
                .ThenInclude(x => x.Project);

            return dependencies;
        }
    }
}
