using System.Linq;
using System.Threading.Tasks;
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

        protected override IQueryable<User> IncludeDependencies(IQueryable<User> queryable)
        {
            var dependencies = queryable
                .Include(x => x.Volunteer)
                .Include(x => x.Organization);
            return dependencies;
        }

        public async Task<User> GetByUsername(string username)
        {
            return await ItemSet.FirstOrDefaultAsync(x => x.Username.Equals(username));
        }

        public async Task<User> GetByEmail(string email)
        {
            return await ItemSet.FirstOrDefaultAsync(x => x.Email.Equals(email));
        }

        public Task<User> GetByCredentials(string username, string password)
        {
            // verify password or get hashed password
            return ItemSet.FirstOrDefaultAsync(x => x.Username.Equals(username) && x.Hash.Equals(password));
        }
    }
}
