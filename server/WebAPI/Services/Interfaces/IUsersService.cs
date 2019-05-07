using System.Security.Claims;
using System.Threading.Tasks;
using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Services.Interfaces
{
    public interface IUsersService : IBaseService<User, UserDto>
    {
        Task<UserDto> Authenticate(UserDto userDto);
        Task Logout(ClaimsPrincipal user);
        Task<long> GetUsersRoleId(ClaimsPrincipal user);
        Task UpdateByEmail(string email, UserDto userDto);
    }
}
