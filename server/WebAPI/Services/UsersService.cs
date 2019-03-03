using System.Text.RegularExpressions;
using AutoMapper;
using WebAPI.Base;
using WebAPI.Models;
using WebAPI.Models.ViewModels;
using WebAPI.Repositories.Interfaces;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services
{
    public class UsersService : BaseService<User, UserViewModel>, IUsersService
    {
        public UsersService(IUsersRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public override bool ValidateViewModel(UserViewModel entity)
        {
            return entity != null
                   && string.IsNullOrWhiteSpace(entity.Email)
                   && string.IsNullOrWhiteSpace(entity.PasswordHash)
                   && string.IsNullOrWhiteSpace(entity.Username)
                   && entity.Username.Length > 5
                   && entity.Username.Length < 40
                   && Regex.IsMatch(entity.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase); ;
        }
    }
}
