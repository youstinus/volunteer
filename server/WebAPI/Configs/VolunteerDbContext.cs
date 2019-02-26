using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Configs
{
    public class VolunteerDbContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<Volunteer> Volunteers { get; set; }
        //public DbSet<Owner> Owners { get; set; }

        public VolunteerDbContext(DbContextOptions<VolunteerDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            SetProjects(modelBuilder);
            SetOrganizations(modelBuilder);
            SetVolunteers(modelBuilder);
            SetUsers(modelBuilder);
            SetProjectVolunteers(modelBuilder);
            base.OnModelCreating(modelBuilder);
        }

        private void SetProjects(ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Entity<Project>();
            entities.HasKey(x => x.Id);
            entities.HasOne(x => x.Organization)
                .WithMany(pt => pt.Projects)
                .HasForeignKey(pt => pt.OrganizationId)
                .OnDelete(DeleteBehavior.Cascade);
            entities.HasMany(x => x.ProjectVolunteers)
                .WithOne(pt => pt.Project)
                .HasForeignKey(pt => pt.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public void SetOrganizations(ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Entity<Organization>();
            entities.HasKey(x => x.Id);
            entities.HasMany(x => x.Projects)
                .WithOne(pt => pt.Organization)
                .HasForeignKey(pt => pt.OrganizationId)
                .OnDelete(DeleteBehavior.Cascade);
            entities.HasOne(x => x.User)
                .WithOne(x => x.Organization)
                .HasForeignKey<User>(x => x.OrganizationId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public void SetVolunteers(ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Entity<Volunteer>();
            entities.HasKey(x => x.Id);
            entities.HasMany(x => x.VolunteerProjects)
                .WithOne(x => x.Volunteer)
                .HasForeignKey(x => x.VolunteerId)
                .OnDelete(DeleteBehavior.Cascade);
            entities.HasOne(x => x.User)
                .WithOne(x => x.Volunteer)
                .HasForeignKey<User>(x => x.VolunteerId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public void SetUsers(ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Entity<User>();
            entities.HasKey(x => x.Id);
            entities.HasOne(x => x.Volunteer)
                .WithOne(x => x.User)
                .HasForeignKey<Volunteer>(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            entities.HasOne(x => x.Organization)
                .WithOne(x => x.User)
                .HasForeignKey<Organization>(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public void SetProjectVolunteers(ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Entity<ProjectVolunteer>();
            entities.HasKey(x => new { x.ProjectId, x.VolunteerId });
        }
    }
}
