using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Services.Interfaces
{
    public interface IReviewsService : IBaseService<Review, ReviewDto>
    {
    }
}
