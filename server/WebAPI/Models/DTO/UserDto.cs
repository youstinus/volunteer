using WebAPI.Base;

namespace WebAPI.Models.DTO
{
    public class UserDto : BaseDto
    {
        public string Username { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        /*public string Username { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PasswordHash { get; set; }
        public UserType Type { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }*/
    }
}
