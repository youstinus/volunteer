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

        public async Task<User> GetByUsername(string username)
        {
            return await ItemSet.FirstOrDefaultAsync(x => x.Username.Equals(username));
        }

        public Task<User> GetByCredentials(string username, string password)
        {
            // verify password or get hashed password
            return ItemSet.FirstOrDefaultAsync(x => x.Username.Equals(username) && x.PasswordHash.Equals(password));
        }
    }
}
