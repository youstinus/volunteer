using WebAPI.Base;
using WebAPI.Enums;

namespace WebAPI.Models.DTO
{
    public class UserDto : BaseDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public UserType Type { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }

        /*public long? VolunteerId { get; set; }
        public long? OrganizationId { get; set; }*/
    }
}
