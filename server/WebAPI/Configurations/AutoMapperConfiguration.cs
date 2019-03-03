using System.Linq;
using AutoMapper;
using WebAPI.Models;
using WebAPI.Models.ViewModels;
using WebAPI.ViewModels;

namespace WebAPI.Configurations
{
    public class AutoMapperConfiguration : Profile
    {
        public AutoMapperConfiguration() : this("volunteer")
        {

        }

        protected AutoMapperConfiguration(string name) : base(name)
        {
            //Participants
            /*CreateMap<ParticipantDto, Participant>(MemberList.None);
            CreateMap<Participant, ParticipantDto>(MemberList.Destination);*/
            //Tournaments
            CreateMap<Car, CarViewModel>(MemberList.None);
            CreateMap<CarViewModel, Car>(MemberList.Destination);
            //Teams
            /*CreateMap<TeamDto, Team>(MemberList.None);
            CreateMap<Team, TeamDto>(MemberList.Destination);
            //Matches
            CreateMap<MatchDto, Match>(MemberList.None);
            CreateMap<Match, MatchDto>(MemberList.Destination)
                .ForMember(dest => dest.MatchTeams, opt => opt.MapFrom(src => src.Teams.Select(x => x.Team)));*/

            MapOrganization();
            MapProject();
            MapPicture();
            MapUser();
            MapVolunteer();

        }

        private void MapOrganization()
        {
            CreateMap<Organization, OrganizationViewModel>(MemberList.None)
                .ForMember(dest => dest.PicturesIds, opt => opt.MapFrom(src => src.Pictures.Select(x => x.Id)))
                .ForMember(dest => dest.ProjectsIds, opt => opt.MapFrom(src => src.Projects.Select(x => x.Id)));
            CreateMap<OrganizationViewModel, Organization>(MemberList.Destination);
        }

        private void MapProject()
        {
            CreateMap<Project, ProjectViewModel>(MemberList.None)
                .ForMember(dest => dest.PicturesIds, opt => opt.MapFrom(src => src.Pictures.Select(x => x.Id)))
                .ForMember(dest => dest.VolunteersIds, opt => opt.MapFrom(src => src.ProjectVolunteers.Select(x => x.ProjectId)));
            CreateMap<ProjectViewModel, Project>(MemberList.Destination);
        }

        private void MapPicture()
        {
            CreateMap<Picture, PictureViewModel>(MemberList.None);
            CreateMap<PictureViewModel, Picture>(MemberList.Destination);
        }

        private void MapUser()
        {
            CreateMap<User, UserViewModel>(MemberList.None);
            CreateMap<UserViewModel, User>(MemberList.Destination);
        }

        private void MapVolunteer()
        {
            CreateMap<Volunteer, VolunteerViewModel>(MemberList.None)
                .ForMember(dest => dest.ProjectsIds, opt => opt.MapFrom(src => src.VolunteerProjects.Select(x => x.ProjectId)));
            CreateMap<VolunteerViewModel, Volunteer>(MemberList.Destination);
        }
    }
}
