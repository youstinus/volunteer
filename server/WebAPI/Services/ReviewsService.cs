using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using WebAPI.Base;
using WebAPI.Enums;
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

        public async Task DeleteByUser(ClaimsPrincipal user, long id)
        {
            if (!user.Identity.IsAuthenticated || string.IsNullOrWhiteSpace(user.Identity.Name))
                throw new InvalidOperationException("User not authenticated");

            var review = await _repository.GetById(id);

            // Admins and Moderators should delete it also
            if(review == null || (user.IsInRole(nameof(UserType.Volunteer)) && review.Volunteer.User.Id.ToString() != user.Identity.Name))
                throw new InvalidOperationException("This review does not belong to you");

            await _repository.Delete(review);
        }

        public async Task UpdateByUser(ClaimsPrincipal user, long id, ReviewDto entityDto)
        {
            if (!user.Identity.IsAuthenticated || string.IsNullOrWhiteSpace(user.Identity.Name) || entityDto == null)
                throw new InvalidOperationException("User not authenticated");

            var success = int.TryParse(user.Identity.Name, out var userId);
            if (!success)
                throw new InvalidOperationException("User not authenticated");

            var volunteer = await _volunteersService.GetByUsersId(userId);
            if (volunteer == null)
                throw new InvalidOperationException("Volunteer not found");

            var review = await _repository.GetById(id);

            if (review == null || review.Volunteer.Id != volunteer.Id)
                throw new InvalidOperationException($"This review with id [{id}] does not belong to you or was not found");

            entityDto.Id = id;
            // todo map from ReviewDto to Review before proper mapping values and what to do with organization id.
            var organizationId = review.OrganizationId;
            _mapper.Map(entityDto, review);
            review.OrganizationId = organizationId;
            review.VolunteerId = volunteer.Id;
            await _repository.Update(review);
        }
    }
}
