using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using WebAPI.Base;
using WebAPI.Models;
using WebAPI.Models.DTO;
using WebAPI.Repositories.Interfaces;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services
{
    public class ProjectsService : BaseService<Project, ProjectDto>, IProjectsService
    {
        private readonly IUsersService _usersService;

        public ProjectsService(
            IProjectsRepository repository,
            IMapper mapper,
            ITimeService timeService,
            IUsersService usersService) : base(repository, mapper, timeService)
        {
            _usersService = usersService;
        }

        public async Task<ICollection<VolunteerDto>> GetVolunteersByProjectId(long id)
        {
            var project = await _repository.GetById(id);
            if (project == null)
                throw new InvalidOperationException($"Project with id {id} was not found");

            var volunteers = project.ProjectVolunteers.Select(x => x.Volunteer);
            var mapped = _mapper.Map<ICollection<VolunteerDto>>(volunteers);
            return mapped;
        }

        public async Task<bool> ValidateOrganizationByProjectId(ClaimsPrincipal user, long id)
        {
            if (string.IsNullOrWhiteSpace(user.Identity.Name))
                return false;

            var parsed = int.TryParse(user.Identity.Name, out var userId);
            if (!parsed)
                return false;

            var projects = await _repository.GetAllByPredicate(x => x.Organization.User.Id == userId);
            return user.Identity.IsAuthenticated && projects.Count > 0 && projects.Select(x => x.Id).Contains(id);
        }

        public async Task<ICollection<ProjectDto>> GetSavedItems(ClaimsPrincipal user)
        {
            var id = await _usersService.GetUsersRoleId(user);
            var items = await _repository.GetAllByPredicate(x => x.SavedVolunteers.Select(y => y.Volunteer.Id).Contains(id));
            var mapped = _mapper.Map<ICollection<ProjectDto>>(items);
            return mapped;
        }

        public async Task<ICollection<ProjectDto>> GetSelectedItems(ClaimsPrincipal user)
        {
            var id = await _usersService.GetUsersRoleId(user);
            var items = await _repository.GetAllByPredicate(x => x.ProjectVolunteers.Select(y => y.Volunteer.Id).Contains(id));
            var mapped = _mapper.Map<ICollection<ProjectDto>>(items);
            return mapped;
        }

        public override bool ValidateDto(ProjectDto entity)
        {
            return entity != null
                   && entity.OrganizationId > 0
                   && string.IsNullOrWhiteSpace(entity.Title)
                   && string.IsNullOrWhiteSpace(entity.Description)
                   && string.IsNullOrWhiteSpace(entity.Email)
                   && Regex.IsMatch(entity.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase)
                   && string.IsNullOrWhiteSpace(entity.Phone)
                   && entity.Start > SqlDateTime.MinValue.Value
                   && entity.End > SqlDateTime.MinValue.Value
                   && entity.Start <= entity.End;
        }
    }
}
