using System.Linq;
using AutoMapper;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Configurations
{
    public class AutoMapperConfiguration : Profile
    {
        public AutoMapperConfiguration() : this("volunteer")
        {

        }

        protected AutoMapperConfiguration(string name) : base(name)
        {
            MapOrganization();
            MapProject();
            MapPicture();
            MapUser();
            MapVolunteer();
            MapReview();
            MapToken();
        }

        private void MapOrganization()
        {
            CreateMap<Organization, OrganizationDto>(MemberList.None)
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User.Id))
                .ForMember(dest => dest.PicturesIds, opt => opt.MapFrom(src => src.Pictures.Select(x => x.Id)))
                .ForMember(dest => dest.ProjectsIds, opt => opt.MapFrom(src => src.Projects.Select(x => x.Id)))
                .ForMember(dest => dest.ReviewsIds, opt => opt.MapFrom(src => src.Reviews.Select(x => x.Id)));
            CreateMap<OrganizationDto, Organization>(MemberList.Destination);
        }

        private void MapProject()
        {
            CreateMap<Project, ProjectDto>(MemberList.None)
                .ForMember(dest => dest.OrganizationId, opt => opt.MapFrom(src => src.Organization.Id))
                .ForMember(dest => dest.PicturesIds, opt => opt.MapFrom(src => src.Pictures.Select(x => x.Id)))
                .ForMember(dest => dest.VolunteersIds, opt => opt.MapFrom(src => src.ProjectVolunteers.Select(x => x.ProjectId)))
                .ForMember(dest => dest.SavedVolunteersIds, opt => opt.MapFrom(src => src.SavedVolunteers.Select(x => x.ProjectId)));
            CreateMap<ProjectDto, Project>(MemberList.Destination);
        }

        private void MapPicture()
        {
            CreateMap<Picture, PictureDto>(MemberList.None)
                .ForMember(dest => dest.ProjectId, opt => opt.MapFrom(src => src.Project.Id))
                .ForMember(dest => dest.OrganizationId, opt => opt.MapFrom(src => src.Organization.Id))
                .ForMember(dest => dest.VolunteerId, opt => opt.MapFrom(src => src.Volunteer.Id));
            CreateMap<PictureDto, Picture>(MemberList.Destination);
        }

        private void MapUser()
        {
            CreateMap<User, UserDto>(MemberList.None);
                /*.ForMember(dest => dest.OrganizationId, opt => opt.MapFrom(src => src.Organization.Id))
                .ForMember(dest => dest.VolunteerId, opt => opt.MapFrom(src => src.Volunteer.Id));*/
            CreateMap<UserDto, User>(MemberList.Destination);
        }

        private void MapVolunteer()
        {
            CreateMap<Volunteer, VolunteerDto>(MemberList.None)
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User.Id))
                .ForMember(dest => dest.PictureId, opt => opt.MapFrom(src => src.Picture.Id))
                .ForMember(dest => dest.ProjectsIds, opt => opt.MapFrom(src => src.VolunteerProjects.Select(x => x.ProjectId)))
                .ForMember(dest => dest.ReviewsIds, opt => opt.MapFrom(src => src.Reviews.Select(x => x.Id)))
                .ForMember(dest => dest.SavedProjectsIds, opt => opt.MapFrom(src => src.SavedProjects.Select(x => x.Project.Id)));
            CreateMap<VolunteerDto, Volunteer>(MemberList.Destination);
        }

        private void MapReview()
        {
            CreateMap<Review, ReviewDto>()
                .ForMember(dest => dest.VolunteerId, opt => opt.MapFrom(src => src.Volunteer.Id))
                .ForMember(dest => dest.OrganizationId, opt => opt.MapFrom(src => src.Organization.Id));
            CreateMap<ReviewDto, Review>();
        }

        private void MapToken()
        {
            CreateMap<Token, TokenDto>();
            CreateMap<TokenDto, Token>();
        }
    }
}
