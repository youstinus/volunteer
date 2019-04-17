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
using Npgsql;
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
            /*var connectionString = configuration["Database:ConnectionString"];
            service.AddDbContext<VolunteerDbContext>(options => options.UseSqlServer(connectionString));*/
            /*var mySqlConnection = "server=localhost;port=3306;user=root;database=Volunteer1;";
            service.AddDbContext<VolunteerDbContext>(options => options.UseMySql(mySqlConnection));*/
            //Environment.GetEnvironmentVariable("DATABASE_URL");//"server=localhost;port=3306;user=root;database=Volunteer1;";
            /*var conn = new NpgsqlConnection("postgres://pcigxbfhhjwcbt:af49c9895b95e5fe925199f0f5632a67a843632cb963fbd5316bd76617b711cd@ec2-54-246-92-116.eu-west-1.compute.amazonaws.com:5432/d8cf73p3n5cald");
            if (string.IsNullOrWhiteSpace(postgresql))
            {
                //throw new InvalidOperationException("Connection string was not found from environmental variable");
                postgresql = configuration["Database:ConnectionString"];
            }

            if (string.IsNullOrWhiteSpace(postgresql))
            {
                throw new InvalidOperationException("Connection string was not found from environmental variable");
                //postgresql = configuration["Database:ConnectionString"];
            }*/

            // Add SQL DB Service
            /*var connectionString = configuration["Database:ConnectionString"];

            if (connectionString == "")
            {
                //Get $DATABASE_URL (Database Connection) 
                var dbConfig = new DbConfig(Environment.GetEnvironmentVariable("DATABASE_URL"));
                connectionString = dbConfig.GetConnectionString();
            }*/

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
            // configure strongly typed settings objects
            var appSettingsSection = configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(x =>
                {
                    /*x.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = context =>
                        {
                            var userService = context.HttpContext.RequestServices.GetRequiredService<IUsersService>();
                            var userId = int.Parse(context.Principal.Identity.Name);
                            var user = userService.GetById(userId);
                            if (user == null)
                            {
                                // return unauthorized if user no longer exists
                                context.Fail("Unauthorized");
                            }
                            return Task.CompletedTask;
                        }
                    };*/
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
