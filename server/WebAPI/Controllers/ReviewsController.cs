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
    public class ReviewsController : BaseController<Review, ReviewDto>, IReviewsController
    {
        public ReviewsController(IBaseService<Review, ReviewDto> service) : base(service)
        {
        }
    }
}
