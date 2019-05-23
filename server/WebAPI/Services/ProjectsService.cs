using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;
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
    public class ProjectsService : BaseService<Project, ProjectDto>, IProjectsService
    {
        private readonly IUsersService _usersService;
        private readonly IVolunteersRepository _volunteersRepository;
        private readonly IOrganizationsRepository _organizationsRepository;

        public ProjectsService(
            IProjectsRepository repository,
            IMapper mapper,
            ITimeService timeService,
            IUsersService usersService,
            IVolunteersRepository volunteersRepository,
            IOrganizationsRepository organizationsRepository) : base(repository, mapper, timeService)
        {
            _usersService = usersService;
            _volunteersRepository = volunteersRepository;
            _organizationsRepository = organizationsRepository;
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

        public async Task<ICollection<ProjectDto>> GetPopularItems()
        {
            var items = await _repository.GetAll();
            var sorted = items.Where(x => x.Start > DateTime.UtcNow).OrderBy(x => x.Start)
                .ThenByDescending(x => x.ProjectVolunteers.Count + x.SavedVolunteers.Count)
                .Take(4).ToList();
            var mapped = _mapper.Map<ICollection<ProjectDto>>(sorted);
            return mapped;
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

        public async Task<ICollection<ProjectDto>> GetCreatedItems(ClaimsPrincipal user)
        {
            var id = await _usersService.GetUsersRoleId(user);
            var items = await _repository.GetAllByPredicate(x => x.Organization.Id == id);
            var mapped = _mapper.Map<ICollection<ProjectDto>>(items);
            return mapped;
        }

        public async Task AddSavedItem(ClaimsPrincipal user, long id)
        {
            if (!user.Identity.IsAuthenticated || string.IsNullOrWhiteSpace(user.Identity.Name) || !int.TryParse(user.Identity.Name, out var userId))
                throw new InvalidOperationException("Cannot save item");

            var project = await _repository.GetById(id);
            var volunteer = await _volunteersRepository.GetSingleByPredicate(x => x.User.Id == userId);
            if (project == null || volunteer == null)
                throw new InvalidOperationException("Project was not found");
                
            var savedProjects = await _repository.GetAllByPredicate(x => x.SavedVolunteers.Any(y => y.Volunteer.User.Id == userId && y.Project.Id == project.Id));
            if (savedProjects.Any())
                throw new InvalidOperationException("Project already saved");

            var savedProject = new SavedProject() {Project = project, Volunteer = volunteer};
            project.SavedVolunteers.Add(savedProject);
            await _repository.SaveChangesAsync();
        }

        public async Task RemoveSavedItem(ClaimsPrincipal user, long id)
        {
            if (!user.Identity.IsAuthenticated || string.IsNullOrWhiteSpace(user.Identity.Name) || !int.TryParse(user.Identity.Name, out var userId))
                throw new InvalidOperationException("Cannot remove saved item");
            
            var project = await _repository.GetById(id);
            if (project == null)
                throw new InvalidOperationException("Project was not found");

            var savedProject = project.SavedVolunteers.FirstOrDefault(x => x.Project.Id == project.Id && x.Volunteer.User.Id == userId);
            if (savedProject == null)
                throw new InvalidOperationException("Project is not saved and cannot be removed");

            project.SavedVolunteers.Remove(savedProject);
            await _repository.SaveChangesAsync();
        }

        public async Task AddSelectedItem(ClaimsPrincipal user, long id)
        {
            if (!user.Identity.IsAuthenticated || string.IsNullOrWhiteSpace(user.Identity.Name) || !int.TryParse(user.Identity.Name, out var userId))
                throw new InvalidOperationException("Cannot select item");

            var project = await _repository.GetById(id);
            var volunteer = await _volunteersRepository.GetSingleByPredicate(x => x.User.Id == userId);
            if (project == null || volunteer == null)
                throw new InvalidOperationException("Project was not found");

            var selectedProjects = await _repository.GetAllByPredicate(x => x.ProjectVolunteers.Any(y => y.Volunteer.User.Id == userId && y.Project.Id == project.Id));
            if (selectedProjects.Any())
                throw new InvalidOperationException("Project already saved");

            var selectedProject = new ProjectVolunteer() { Project = project, Volunteer = volunteer };
            project.ProjectVolunteers.Add(selectedProject);
            await _repository.SaveChangesAsync();
        }

        public async Task RemoveSelectedItem(ClaimsPrincipal user, long id)
        {
            if (!user.Identity.IsAuthenticated || string.IsNullOrWhiteSpace(user.Identity.Name) || !int.TryParse(user.Identity.Name, out var userId))
                throw new InvalidOperationException("Cannot remove selected item");

            var project = await _repository.GetById(id);
            if (project == null)
                throw new InvalidOperationException("Project was not found");

            var selectedProject = project.ProjectVolunteers.FirstOrDefault(x => x.Project.Id == project.Id && x.Volunteer.User.Id == userId);
            if (selectedProject == null)
                throw new InvalidOperationException("Project is not selected and cannot be removed");

            project.ProjectVolunteers.Remove(selectedProject);
            await _repository.SaveChangesAsync();
        }

        public async Task<bool> IsSavedItem(ClaimsPrincipal user, long id)
        {
            if (!user.Identity.IsAuthenticated || string.IsNullOrWhiteSpace(user.Identity.Name) || !int.TryParse(user.Identity.Name, out var userId))
                throw new InvalidOperationException("Not authenticated");
            
            var volunteer = await _volunteersRepository.GetSingleByPredicate(x => x.User.Id == userId);
            if (volunteer?.User == null || volunteer.User.Type != UserType.Volunteer)
                throw new InvalidOperationException("Not authenticated");

            return volunteer.SavedProjects.Any(x => x.Project.Id == id);
        }

        public async Task<bool> IsSelectedItem(ClaimsPrincipal user, long id)
        {
            if (!user.Identity.IsAuthenticated || string.IsNullOrWhiteSpace(user.Identity.Name) || !int.TryParse(user.Identity.Name, out var userId))
                throw new InvalidOperationException("Not authenticated");

            var volunteer = await _volunteersRepository.GetSingleByPredicate(x => x.User.Id == userId);
            if (volunteer?.User == null || volunteer.User.Type != UserType.Volunteer)
                throw new InvalidOperationException("Not authenticated");

            return volunteer.VolunteerProjects.Any(x => x.Project.Id == id);
        }

        public override async Task<ProjectDto> Create(ProjectDto entityDto)
        {
            if (entityDto == null)
                throw new ArgumentNullException(nameof(entityDto));

            var entity = CreatePoco(entityDto);
            if (entity.OrganizationId < 0)
                throw new InvalidOperationException("Organization not entered");

            var organization = await _organizationsRepository.GetSingleByPredicate(x => x.User.Id == entity.OrganizationId);
            if (organization == null || organization.Id < 0)
                throw new InvalidOperationException("Organization was not found");

            entity.OrganizationId = organization.Id;
            var created = await _repository.Create(entity);
            var mappedDto = _mapper.Map<ProjectDto>(created);
            return mappedDto;
        }
        // todo need patch also
        public override async Task Update(long id, ProjectDto entityDto)
        {
            if (entityDto == null)
                throw new ArgumentNullException(nameof(entityDto));

            var itemToUpdate = await _repository.GetById(id);
            if (itemToUpdate == null)
                throw new InvalidOperationException($"Entity {id} was not found");

            if (entityDto.OrganizationId < 0)
                throw new InvalidOperationException("Organization not entered");

            var organization = await _organizationsRepository.GetSingleByPredicate(x => x.User.Id == entityDto.OrganizationId);
            if (organization == null || organization.Id < 0)
                throw new InvalidOperationException("Organization was not found");

            entityDto.OrganizationId = organization.Id;

            entityDto.Id = id;
            _mapper.Map(entityDto, itemToUpdate);
            await _repository.Update(itemToUpdate);
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
