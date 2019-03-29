using AutoMapper;
using WebAPI.Base;
using WebAPI.Models;
using WebAPI.Models.DTO;
using WebAPI.Repositories.Interfaces;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services
{
    public class ReviewsService : BaseService<Review, ReviewDto>, IReviewsService
    {
        public ReviewsService(IReviewsRepository repository, IMapper mapper, ITimeService timeService) : base(repository, mapper, timeService)
        {
        }
    }
}
