using Microsoft.Extensions.DependencyInjection;
using WebAPI.Repositories;
using WebAPI.Repositories.Interfaces;
using WebAPI.Services;
using WebAPI.Services.Interfaces;

namespace WebAPI.Configurations
{
    public static class DependencyConfigurations
    {
        public static IServiceCollection AddAllDependencies(this IServiceCollection services)
        {
            return services
                .AddRepositoryDependencies()
                .AddServiceDependencies();
        }
        
        public static IServiceCollection AddRepositoryDependencies(this IServiceCollection services)
        {
            return services
                .AddScoped<IOrganizationsRepository, OrganizationsRepository>()
                .AddScoped<IProjectsRepository, ProjectsRepository>()
                .AddScoped<IUsersRepository, UsersRepository>()
                .AddScoped<IPicturesRepository, PicturesRepository>()
                .AddScoped<IReviewsRepository, ReviewsRepository>()
                .AddScoped<IVolunteersRepository, VolunteersRepository>();
        }
        
        public static IServiceCollection AddServiceDependencies(this IServiceCollection services)
        {
            return services
                .AddScoped<IOrganizationsService, OrganizationsService>()
                .AddScoped<IProjectsService, ProjectsService>()
                .AddScoped<IUsersService, UsersService>()
                .AddScoped<IPicturesService, PicturesService>()
                .AddScoped<IReviewsService, ReviewsService>()
                .AddScoped<IVolunteersService, VolunteersService>()
                .AddSingleton<ITimeService, TimeService>();
        }
    }
}
