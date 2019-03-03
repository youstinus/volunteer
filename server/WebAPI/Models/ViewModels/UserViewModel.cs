using WebAPI.Base;
using WebAPI.Enums;

namespace WebAPI.Models.ViewModels
{
    public class UserViewModel : BaseViewModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PasswordHash { get; set; }
        public UserType Type { get; set; }
    }
}
