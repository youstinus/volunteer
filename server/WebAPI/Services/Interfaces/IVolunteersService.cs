﻿using System.Security.Claims;
using System.Threading.Tasks;
using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Services.Interfaces
{
    public interface IVolunteersService : IBaseService<Volunteer, VolunteerDto>
    {
    }
}
