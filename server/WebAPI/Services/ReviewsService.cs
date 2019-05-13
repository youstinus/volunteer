using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
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
        private readonly IVolunteersService _volunteersService;

        public ReviewsService(IReviewsRepository repository, IMapper mapper, ITimeService timeService, IVolunteersService volunteersService) : base(repository, mapper, timeService)
        {
            _volunteersService = volunteersService;
        }

        public async Task<ICollection<ReviewDto>> GetByOrganizationId(long id)
        {
            var entities = await _repository.GetAllByPredicate(x => x.Organization.Id == id);
            var mapped = _mapper.Map<ICollection<ReviewDto>>(entities);
            return mapped;
        }

        public async Task<ReviewDto> CreateByUser(ClaimsPrincipal user, ReviewDto entity)
        {
            if(!user.Identity.IsAuthenticated || string.IsNullOrWhiteSpace(user.Identity.Name) || entity == null || entity.OrganizationId <= 0)
                throw new InvalidOperationException("User not authenticated");

            var success = int.TryParse(user.Identity.Name, out var userId);
            if(!success)
                throw new InvalidOperationException("User not authenticated");

            var volunteer = await _volunteersService.GetByUsersId(userId);
            if(volunteer == null)
                throw new InvalidOperationException("Volunteer not found");

            entity.VolunteerId = volunteer.Id;
            var created = await Create(entity);
            return created;
        }
    }
}
