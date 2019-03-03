using Microsoft.EntityFrameworkCore;
using WebAPI.Base;
using WebAPI.Configurations;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;

namespace WebAPI.Repositories
{
    public class OrganizationsRepository : BaseRepository<Organization>, IOrganizationsRepository
    {
        protected override DbSet<Organization> ItemSet { get; }
        public OrganizationsRepository(VolunteerDbContext context) : base(context)
        {
            ItemSet = context.Organizations;
        }
    }
}
