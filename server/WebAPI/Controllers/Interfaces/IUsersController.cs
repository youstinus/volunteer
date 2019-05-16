using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Controllers.Interfaces
{
    public interface IUsersController : IBaseController<User, UserDto>
    {
        Task<IActionResult> Authenticate([FromBody] UserDto user);
        Task<IActionResult> Logout();
        Task<IActionResult> UpdateByEmail([FromRoute] string email, [FromBody] UserDto userDto);
        Task<IActionResult> UpdateLoggedInUser([FromBody] UserDto userDto);
    }
}
