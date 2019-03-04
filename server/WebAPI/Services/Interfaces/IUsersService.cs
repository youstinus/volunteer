using System.Threading.Tasks;
using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Services.Interfaces
{
    public interface IUsersService : IBaseService<User, UserDto>
    {
        Task<UserDto> Authenticate(string username, string password);
        Task<User> Authenticate2(string username, string password);
        Task<User> Create(UserDto user, string password);
        Task Update(User user, string password = null);
    }
}
