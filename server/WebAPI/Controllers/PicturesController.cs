using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Base;
using WebAPI.Base.Interfaces;
using WebAPI.Controllers.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Controllers
{
    public class PicturesController : BaseController<Picture, PictureDto>, IPicturesController
    {
        public PicturesController(IBaseService<Picture, PictureDto> service) : base(service)
        {
        }
    }
}
