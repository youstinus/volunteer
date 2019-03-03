using Microsoft.EntityFrameworkCore;
using WebAPI.Base;
using WebAPI.Configurations;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;

namespace WebAPI.Repositories
{
    public class UsersRepository : BaseRepository<User>, IUsersRepository
    {
        protected override DbSet<User> ItemSet { get; }
        public UsersRepository(VolunteerDbContext context) : base(context)
        {
            ItemSet = context.Users;
        }
    }
}
