using Microsoft.Extensions.DependencyInjection;
using WebAPI.Repositories;
using WebAPI.Repositories.Interfaces;
using WebAPI.Services;
using WebAPI.Services.Interfaces;

namespace WebAPI.Configs
{
    public static class DependencyConfigurations
    {
        public static IServiceCollection AddDependencies(this IServiceCollection services)
        {
            return services
                .AddRepositoryDependencies()
                .AddServiceDependencies();
        }
        
        public static IServiceCollection AddRepositoryDependencies(this IServiceCollection services)
        {
            return services
                .AddScoped<ITestRepository, TestRepository>();
        }
        
        public static IServiceCollection AddServiceDependencies(this IServiceCollection services)
        {
            return services
                .AddScoped<ITestService, TestService>();
        }
    }
}
