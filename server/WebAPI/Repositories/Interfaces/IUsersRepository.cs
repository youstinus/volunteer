using System.Threading.Tasks;
using WebAPI.Base.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repositories.Interfaces
{
    public interface IUsersRepository : IBaseRepository<User>
    {
        Task<User> GetByUsername(string username);
        Task<User> GetByEmail(string email);
        Task<User> GetByCredentials(string username, string password);
    }
}
