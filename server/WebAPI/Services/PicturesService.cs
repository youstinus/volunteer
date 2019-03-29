using AutoMapper;
using WebAPI.Base;
using WebAPI.Models;
using WebAPI.Models.DTO;
using WebAPI.Repositories.Interfaces;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services
{
    public class PicturesService : BaseService<Picture, PictureDto>, IPicturesService
    {
        public PicturesService(IPicturesRepository repository, IMapper mapper, ITimeService timeService) : base(repository, mapper, timeService)
        {
        }
    }
}
