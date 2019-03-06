﻿using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Services.Interfaces
{
    public interface ITestService : IBaseService<Test, TestDto1>
    {
    }
}
