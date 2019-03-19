using Microsoft.Extensions.DependencyInjection;
using WebAPI.Commands;
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
                .AddServiceDependencies()
                //.AddMapperDependencies()
                .AddTestCarDependencies();
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

        private static IServiceCollection AddMapperDependencies(this IServiceCollection services)
        {
            var config = new AutoMapper.MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperConfiguration());
            });
            var mapper = config.CreateMapper();

            return services.AddSingleton(mapper);
        }

        public static IServiceCollection AddTestCarDependencies(this IServiceCollection services)
        {
            return services
                .AddSingleton<IDeleteCarCommand, DeleteCarCommand>()
                .AddSingleton<IGetCarCommand, GetCarCommand>()
                .AddSingleton<IGetCarPageCommand, GetCarPageCommand>()
                .AddSingleton<IPatchCarCommand, PatchCarCommand>()
                .AddSingleton<IPostCarCommand, PostCarCommand>()
                .AddSingleton<IPutCarCommand, PutCarCommand>()
                /*.AddSingleton<IMapper<Models.Car, Car>, CarToCarMapper>()
                .AddSingleton<IMapper<Models.Car, SaveCar>, CarToSaveCarMapper>()
                .AddSingleton<IMapper<SaveCar, Models.Car>, CarToSaveCarMapper>()*/
                .AddSingleton<ICarRepository, CarRepository>()
                .AddSingleton<ITimeService, TimeService>();
        }
    }
}
