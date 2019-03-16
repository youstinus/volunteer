using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WebAPI.Base;
using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services
{
    public class PicturesService : BaseService<Picture, PictureDto>, IPicturesService
    {
        public PicturesService(IBaseRepository<Picture> repository, IMapper mapper, ITimeService timeService) : base(repository, mapper, timeService)
        {
        }
    }
}
