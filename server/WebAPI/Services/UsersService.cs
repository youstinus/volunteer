﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Base;
using WebAPI.Enums;
using WebAPI.Models;
using WebAPI.Models.DTO;
using WebAPI.Repositories.Interfaces;
using WebAPI.Services.Interfaces;
using WebAPI.Utilities;

namespace WebAPI.Services
{
    public class UsersService : BaseService<User, UserDto>, IUsersService
    {
        private readonly IUsersRepository _usersRepository;
        private readonly ITimeService _timeService;
        private readonly IVolunteersService _volunteersService;
        private readonly IOrganizationsService _organizationsService;


        public UsersService(
            IUsersRepository repository,
            IMapper mapper,
            ITimeService timeService,
            IVolunteersService volunteersService,
            IOrganizationsService organizationsService) : base(repository, mapper, timeService)
        {
            _usersRepository = repository;
            _timeService = timeService;
            _volunteersService = volunteersService;
            _organizationsService = organizationsService;
        }

        // role based
        public async Task<UserDto> Authenticate(UserDto userGiven)
        {
            if (string.IsNullOrWhiteSpace(userGiven.Username) || string.IsNullOrWhiteSpace(userGiven.Password))
                throw new InvalidOperationException($"Username or password wrongly typed");

            var user = await _usersRepository.GetByUsername(userGiven.Username);

            // check if username exists
            if (user == null)
                throw new InvalidOperationException($"User with username: {userGiven.Username} was not found");

            // check if password is correct
            if (!VerifyPasswordHash(userGiven.Password, user.Hash, user.Salt))
                throw new InvalidOperationException($"Incorrect password");

            //var user = await _usersRepository.GetByCredentials(username, password); //_users.SingleOrDefault(x => x.Username == username && x.Password == password);
            var userDto = CreateDto(user);
            // return null if user not found
            if (userDto == null)
                throw new InvalidOperationException($"Mapping failed");

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var secret = Environment.GetEnvironmentVariable("APP_SECRET");
            if (string.IsNullOrWhiteSpace(secret))
                throw new InvalidOperationException("Secret was null in the environment variables");

            var key = Encoding.ASCII.GetBytes(secret);
            
            var subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, userDto.Id.ToString()),
                new Claim(ClaimTypes.Role, Enum.GetName(typeof(UserType), userDto.Type))
            });
            var sign = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = subject,
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = sign
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            userDto.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            userDto.Password = null;

            return userDto;
        }

        public async Task Logout(ClaimsPrincipal user)
        {
            if (!user.Identity.IsAuthenticated)
                throw new InvalidOperationException("User not logged in");

            var client = await _usersRepository.GetById(int.Parse(user.Identity.Name));

        }

        public override async Task<UserDto> Create(UserDto userDto)
        {
            // map dto to entity
            var user = CreatePoco(userDto);
            user.Created = _timeService.GetCurrentTime();

            // validation
            if (string.IsNullOrWhiteSpace(userDto.Password))
                throw new ArgumentException("Password not entered");

            var userCheck = await _usersRepository.GetByUsername(user.Username);
            if (userCheck != null)
                throw new InvalidOperationException($"Username {user.Username} is already taken");

            userCheck = await _usersRepository.GetByEmail(userDto.Email);
            if (userCheck != null)
                throw new InvalidOperationException("Email " + userDto.Email + " is already taken");
            
            CreatePasswordHash(userDto.Password, out var passwordHash, out var passwordSalt);
            user.Hash = passwordHash;
            user.Salt = passwordSalt;
            CreateProfileByType(user); // create empty volunteer
            
            var created = await _repository.Create(user);
            var createdDto = CreateDto(created);
            createdDto.Password = null;
            return createdDto;
        }

        // is it possible to change username ?
        public override async Task Update(long id, UserDto userDto)
        {
            var user = await _repository.GetById(id);

            if (user == null)
                throw new InvalidOperationException($"User with Id {id} was not found");

            if (userDto.Username != user.Username)
            {
                // username has changed so check if the new username is already taken
                var userCheck = await _usersRepository.GetByUsername(userDto.Username);
                if (userCheck != null)
                    throw new InvalidOperationException("Username " + userDto.Username + " is already taken");
            }

            if (userDto.Email != user.Email)
            {
                // email has changed so check if the new email is already taken
                var userCheck = await _usersRepository.GetByEmail(userDto.Email);
                if (userCheck != null)
                    throw new InvalidOperationException("Email " + userDto.Email + " is already taken");
            }

            // later implement mapper
            user.Username = userDto.Username;
            user.Email = userDto.Email;
            user.Updated = _timeService.GetCurrentTime();

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(userDto.Password))
            {
                CreatePasswordHash(userDto.Password, out var passwordHash, out var passwordSalt);

                user.Hash = passwordHash;
                user.Salt = passwordSalt;
            }

            await _repository.Update(user);
        }
        
        public async Task UpdateByEmail(string cipher, UserDto userDto)
        {
            if(string.IsNullOrWhiteSpace(cipher))
                throw new InvalidOperationException("Bad parameter");

            var email = Crypto.Decrypt(Decipher(cipher));

            var entity = await _repository.GetSingleByPredicate(x => x.Email.Equals(email));

            if (entity == null || userDto == null || string.IsNullOrWhiteSpace(userDto.Password) || userDto.Password.Length < 3)
                throw new InvalidOperationException($"User with email {email} was not found");
            
            // later implement mapper
            entity.Updated = _timeService.GetCurrentTime();

            // update password if it was entered
            CreatePasswordHash(userDto.Password, out var passwordHash, out var passwordSalt);
            entity.Hash = passwordHash;
            entity.Salt = passwordSalt;
            
            await _repository.Update(entity);
        }
        
        // old pass is in token
        public async Task UpdateLoggedInUser(UserDto userDto, ClaimsPrincipal user)
        {
            if (user?.Identity == null || !user.Identity.IsAuthenticated || !int.TryParse(user.Identity.Name, out var id))
                throw new InvalidOperationException("Cannot change password");
            
            var entity = await _repository.GetById(id);

            if (entity == null || userDto == null || string.IsNullOrWhiteSpace(userDto.Password) || userDto.Password.Length < 3)
                throw new InvalidOperationException($"Cannot update password");
            
            // Old password is token
            if (!VerifyPasswordHash(userDto.Token, entity.Hash, entity.Salt))
                throw new InvalidOperationException($"Incorrect old password");

            // later implement mapper
            entity.Updated = _timeService.GetCurrentTime();

            // update password if it was entered
            CreatePasswordHash(userDto.Password, out var passwordHash, out var passwordSalt);
            entity.Hash = passwordHash;
            entity.Salt = passwordSalt;

            await _repository.Update(entity);
        }

        public async Task Delete(ClaimsPrincipal tokenUser, long givenId)
        {
            if (tokenUser?.Identity == null || !tokenUser.Identity.IsAuthenticated || !int.TryParse(tokenUser.Identity.Name, out var id) || id != givenId)
                throw new InvalidOperationException("Cannot change password");

            var user = await _repository.GetById(id);
            var organization = user.Organization;
            var volunteer = user.Volunteer;
            if (organization != null)
                await _organizationsService.Delete(organization.Id);
            
            if (volunteer != null)
                await _volunteersService.Delete(volunteer.Id);
            
            await _usersRepository.Delete(user);
        }

        public override User CreatePoco(UserDto entityDto)
        {
            var updateTime = _timeService.GetCurrentTime();
            var user = base.CreatePoco(entityDto);
            user.Updated = updateTime;
            return user;
        }

        #region Private helper methods

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null)
                throw new InvalidOperationException(nameof(password));
            if (string.IsNullOrWhiteSpace(password))
                throw new InvalidOperationException("Value cannot be empty or whitespace only string.");

            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, IReadOnlyList<byte> storedHash, byte[] storedSalt)
        {
            if (password == null)
                throw new InvalidOperationException(nameof(password));
            if (string.IsNullOrWhiteSpace(password))
                throw new InvalidOperationException("Value cannot be empty or whitespace only string.");
            if (storedHash.Count != 64)
                throw new InvalidOperationException("Invalid length of password hash (64 bytes expected).");
            if (storedSalt.Length != 128)
                throw new InvalidOperationException("Invalid length of password salt (128 bytes expected).");

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

        private static void CreateProfileByType(User user)
        {
            switch (user.Type)
            {
                case UserType.Organization:
                    user.Organization = new Organization();
                    break;
                case UserType.Volunteer:
                    user.Volunteer = new Volunteer();
                    break;
                case UserType.Admin:
                    break;
                case UserType.Moderator:
                    break;
                default:
                    throw new InvalidOperationException("User type is not valid while registering");
            }
        }

        private static string Decipher(string cipher)
        {
            var mod4 = cipher.Length % 4;
            if (mod4 > 0)
            {
                cipher += new string('=', 4 - mod4);
            }
            var data = Convert.FromBase64String(cipher);
            return Encoding.ASCII.GetString(data);
        }

        private static string DecryptNodeJs2(string encoded)
        {
            var keyString = "s7^(v(WMjOi.mI387OPfYTcy.SWbX7zy"; //replace with your key
            var ivString = "#yH2*m14v8((5kBQ"; //replace with your iv

            var key = Encoding.ASCII.GetBytes(keyString);
            var iv = Encoding.ASCII.GetBytes(ivString);

            using (var rijndaelManaged = new RijndaelManaged { Key = key, IV = iv, Mode = CipherMode.CBC })
            {
                rijndaelManaged.BlockSize = 128;
                rijndaelManaged.KeySize = 256;
                using (var memoryStream = new MemoryStream(Convert.FromBase64String(encoded)))
                using (var cryptoStream = new CryptoStream(memoryStream, rijndaelManaged.CreateDecryptor(key, iv), CryptoStreamMode.Read))
                {
                    return new StreamReader(cryptoStream).ReadToEnd();
                }
            }
        }

        #endregion

            #region Validation

        public override bool ValidateDto(UserDto entity)
        { // define user validations
            return entity != null
                   //&& string.IsNullOrWhiteSpace(entity.Email)
                   && !string.IsNullOrWhiteSpace(entity.Password)
                   && !string.IsNullOrWhiteSpace(entity.Username)
                   && entity.Username.Length > 3
                   && entity.Username.Length < 40;
            //&& Regex.IsMatch(entity.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase); ;
        }
        
        public virtual async Task<long> GetUsersRoleId(ClaimsPrincipal user)
        {
            var parsed = int.TryParse(user.Identity.Name, out var id);
            if (!parsed || !user.Identity.IsAuthenticated || string.IsNullOrWhiteSpace(user.Identity.Name))
                throw new InvalidOperationException($"User is not authenticated");

            var item = await _repository.GetById(id);
            if(item == null)
                throw new InvalidOperationException($"User was not found");

            if (item.Volunteer != null)
            {
                return item.Volunteer.Id;
            }

            if (item.Organization != null)
            {
                return item.Organization.Id;
            }

            throw new InvalidOperationException($"Get profile id failed");
        }

        #endregion
    }
}
