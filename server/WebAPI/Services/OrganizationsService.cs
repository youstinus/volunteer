using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Base;
using WebAPI.Models;
using WebAPI.Models.DTO;
using WebAPI.Repositories.Interfaces;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services
{
    public class OrganizationsService : BaseService<Organization, OrganizationDto>, IOrganizationsService
    {
        public OrganizationsService(
            IOrganizationsRepository repository,
            IMapper mapper,
            ITimeService timeService) : base(repository, mapper, timeService)
        {
        }

        public async Task<bool> ValidateUserByOrganizationsId(ClaimsPrincipal user, long id)
        {
            if (string.IsNullOrWhiteSpace(user.Identity.Name))
                return false;

            var parsed = int.TryParse(user.Identity.Name, out var userId);
            if (!parsed)
                return false;

            var organization = await _repository.GetSingleByPredicate(x => x.User.Id == userId);
            if (organization == null)
                return false;

            return organization.Id == id;
        }

        public async Task<bool> OrganizationExists(ProjectDto entity)
        {
            if (entity == null || entity.OrganizationId < 0)
                return false;

            var organization = await _repository.GetSingleByPredicate(x => x.User.Id == entity.OrganizationId);
            return organization != null;
        }

        public async Task<OrganizationDto> GetByUser(ClaimsPrincipal user, long id)
        {
            if (!user.Identity.IsAuthenticated || user.Identity.Name != id.ToString())
                throw new InvalidOperationException("Not authenticated");

            var organization = await _repository.GetSingleByPredicate(x => x.User.Id == id);
            if (organization == null)
                throw new InvalidOperationException("Organization not found");

            var mapped = _mapper.Map<OrganizationDto>(organization);
            return mapped;
        }

        public async Task<ICollection<OrganizationDto>> GetPopularItems()
        {
            var items = await _repository.GetAll();
            var sorted = items.Where(x => !string.IsNullOrWhiteSpace(x.Title) && !string.IsNullOrWhiteSpace(x.Description) && !string.IsNullOrWhiteSpace(x.Email) && !string.IsNullOrWhiteSpace(x.Phone)).OrderByDescending(x => x.Projects.Sum(y => y.ProjectVolunteers.Count + y.SavedVolunteers.Count)).Take(4).ToList();
            var mapped = _mapper.Map<ICollection<OrganizationDto>>(sorted);
            return mapped;
        }

        public override bool ValidateDto(OrganizationDto entity)
        {
            return entity != null
                   && entity.UserId > 0;
            //&& string.IsNullOrWhiteSpace(entity.Title)
            //&& string.IsNullOrWhiteSpace(entity.Description);
        }
    }
}
