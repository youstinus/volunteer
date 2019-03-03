using System.Data.SqlTypes;
using System.Text.RegularExpressions;
using AutoMapper;
using WebAPI.Base;
using WebAPI.Models;
using WebAPI.Models.ViewModels;
using WebAPI.Repositories.Interfaces;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services
{
    public class ProjectsService : BaseService<Project, ProjectViewModel>, IProjectsService
    {
        public ProjectsService(IProjectsRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public override bool ValidateViewModel(ProjectViewModel entity)
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
