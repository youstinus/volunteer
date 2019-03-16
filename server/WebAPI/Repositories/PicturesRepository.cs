using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Base;
using WebAPI.Configurations;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;

namespace WebAPI.Repositories
{
    public class PicturesRepository : BaseRepository<Picture>, IPicturesRepository
    {
        protected override DbSet<Picture> ItemSet { get; }

        public PicturesRepository(VolunteerDbContext context) : base(context)
        {
        }

        protected override IQueryable<Picture> IncludeDependencies(IQueryable<Picture> queryable)
        {
            var dependencies = queryable
                .Include(x => x.Organization)
                .Include(x => x.Volunteer)
                .Include(x => x.Project);
            return dependencies;
        }
    }
}
