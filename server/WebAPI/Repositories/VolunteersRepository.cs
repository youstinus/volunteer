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
    }
}
