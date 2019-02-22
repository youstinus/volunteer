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
    public class OrganizationsRepository : BaseRepository<Organization>
    {
        protected override DbSet<Organization> ItemSet { get; }
        public OrganizationsRepository(VolunteerDbContext context) : base(context)
        {
            ItemSet = context.Organizations;
        }
    }
}
