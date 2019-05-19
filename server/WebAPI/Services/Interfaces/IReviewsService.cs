using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Services.Interfaces
{
    public interface IReviewsService : IBaseService<Review, ReviewDto>
    {
        Task<ICollection<ReviewDto>> GetByOrganizationId(long id);
        Task<ReviewDto> CreateByUser(ClaimsPrincipal user, ReviewDto entity);
        Task DeleteByUser(ClaimsPrincipal user, long id);
        Task UpdateByUser(ClaimsPrincipal user, long id, ReviewDto entity);
    }
}
