using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Base;
using WebAPI.Helpers;
using WebAPI.Models;
using WebAPI.Models.DTO;
using WebAPI.Repositories.Interfaces;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services
{
    public class UsersService : BaseService<User, UserDto>, IUsersService
    {
        private readonly IUsersRepository _usersRepository;
        private readonly AppSettings _appSettings;
        public UsersService(
            IUsersRepository repository,
            IMapper mapper,
            IOptions<AppSettings> appSettings,
            ITimeService timeService) : base(repository, mapper, timeService)
        {
            _usersRepository = repository;
            _appSettings = appSettings.Value;
        }

        // role based
        public async Task<UserDto> Authenticate(string username, string password)
        {
            var user = await _usersRepository.GetByCredentials(username, password); //_users.SingleOrDefault(x => x.Username == username && x.Password == password);
            var userDto = _mapper.Map<UserDto>(user);
            // return null if user not found
            if (userDto == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, userDto.Id.ToString()),
                    new Claim(ClaimTypes.Role, userDto.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            userDto.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            userDto.Password = null;

            return userDto;
        }

        // normal auth
        public async Task<User> Authenticate2(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = await _usersRepository.GetByUsername(username);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // authentication successful
            return user;
        }
        
        public async Task<User> Create(UserDto userDto, string password)
        {
            // map dto to entity
            var user = _mapper.Map<User>(userDto);

            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            var userCheck = await _usersRepository.GetByUsername(user.Username);
            if (userCheck != null)
                throw new AppException("Username \"" + user.Username + "\" is already taken");

            CreatePasswordHash(password, out var passwordHash, out var passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            
            return await _repository.Create(user);
        }

        public async Task Update(User userParam, string password = null)
        {
            var user = await _repository.GetById(userParam.Id);

            if (user == null)
                throw new AppException("User not found");

            if (userParam.Username != user.Username)
            {
                // username has changed so check if the new username is already taken
                var userCheck = await _usersRepository.GetByUsername(userParam.Username);
                if (userCheck != null)
                    throw new AppException("Username " + userParam.Username + " is already taken");
            }

            // update user properties
            user.FirstName = userParam.FirstName;
            user.LastName = userParam.LastName;
            user.Username = userParam.Username;

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                CreatePasswordHash(password, out var passwordHash, out var passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            await _repository.Update(user);
        }

        public override Task<UserDto> Create(UserDto entityDto)
        {
            throw new InvalidOperationException("Not usable");
        }

        public override Task<bool> Update(long id, UserDto entityDto)
        {
            throw new InvalidOperationException("Not usable");
        }


        #region Private helper methods

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));

            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, IReadOnlyList<byte> storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));
            if (storedHash.Count != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", nameof(password));
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", nameof(password));

            using (var hmac = new HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        #endregion

        #region Validation

        public override bool ValidateDto(UserDto entity)
        {
            return entity != null
                   //&& string.IsNullOrWhiteSpace(entity.Email)
                   && string.IsNullOrWhiteSpace(entity.Password)
                   && string.IsNullOrWhiteSpace(entity.Username)
                   && entity.Username.Length > 5
                   && entity.Username.Length < 40;
            //&& Regex.IsMatch(entity.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase); ;
        }

        #endregion
    }
}
