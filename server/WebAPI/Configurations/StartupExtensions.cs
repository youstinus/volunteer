using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using WebAPI.Helpers;
using WebAPI.Utilities;

namespace WebAPI.Configurations
{
    public static class StartupExtensions
    {
        public static void SetUpAutoMapper(this IServiceCollection services)
        {
            var config = new AutoMapper.MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperConfiguration());
            });
            var mapper = config.CreateMapper();

            services.AddSingleton(mapper);
        }

        public static void SetUpDatabase(this IServiceCollection service, IConfiguration configuration)
        {
            var postgresql = StringTranslator.GetConnectionString();
            service.AddDbContext<VolunteerDbContext>(options => options.UseNpgsql(postgresql));
        }

        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Title = "volunteer",
                    Version = "v1",
                    Description = "ASP.NET Core Web API",
                    TermsOfService = "None",
                    Contact = new Contact
                    {
                        Name = "Platypus",
                        Email = string.Empty,
                        Url = ""
                    },
                    License = new License
                    {
                        Name = "Use under MIT",
                        Url = "https://opensource.org/licenses/MIT"
                    }
                });
                c.AddSecurityDefinition("Bearer",
                    new ApiKeyScheme
                    {
                        In = "header",
                        Description = "Please enter into field the word 'Bearer' following by space and JWT",
                        Name = "Authorization",
                        Type = "apiKey"
                    });
                c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>> {
                    { "Bearer", Enumerable.Empty<string>() },
                });
            });
            return services;
        }

        public static void UseConfigureSwagger(this IApplicationBuilder app)
        {
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "volunteer");
                //c.RoutePrefix = "api";
            });
        }

        public static void AddAuthorizationConfigs(this IServiceCollection services, IConfiguration configuration)
        {
            var secret = Environment.GetEnvironmentVariable("APP_SECRET");
            if(string.IsNullOrWhiteSpace(secret))
                throw new InvalidOperationException("Secret was not found for authorization initialization");

            var key = Encoding.ASCII.GetBytes(secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
        }
    }
}
