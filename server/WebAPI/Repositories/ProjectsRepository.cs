using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Base;
using WebAPI.Configs;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class ProjectsRepository : BaseRepository<Project>
    {
        protected override DbSet<Project> ItemSet { get; }
        public ProjectsRepository(VolunteerDbContext context) : base(context)
        {
            ItemSet = context.Projects;
        }
    }
}
