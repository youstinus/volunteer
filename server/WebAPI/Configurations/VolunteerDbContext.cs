using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Configurations
{
    public class VolunteerDbContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<Volunteer> Volunteers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Picture> Pictures { get; set; }

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
            SetPictures(modelBuilder);
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
            entities.HasMany(x => x.Pictures)
                .WithOne(x => x.Project)
                .HasForeignKey(x => x.ProjectId);
        }

        public void SetOrganizations(ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Entity<Organization>();
            entities.HasKey(x => x.Id);
            entities.HasMany(x => x.Projects)
                .WithOne(pt => pt.Organization)
                .HasForeignKey(pt => pt.OrganizationId)
                .OnDelete(DeleteBehavior.Cascade);
            entities.HasMany(x => x.Pictures)
                .WithOne(x => x.Organization)
                .HasForeignKey(x => x.OrganizationId);
        }

        public void SetVolunteers(ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Entity<Volunteer>();
            entities.HasKey(x => x.Id);
            entities.HasMany(x => x.VolunteerProjects)
                .WithOne(x => x.Volunteer)
                .HasForeignKey(x => x.VolunteerId)
                .OnDelete(DeleteBehavior.Cascade);
            entities.HasOne(x => x.Picture)
                .WithOne(x => x.Volunteer)
                .HasForeignKey<Picture>(x => x.VolunteerId);
        }

        public void SetUsers(ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Entity<User>();
            entities.HasKey(x => x.Id);
        }

        public void SetProjectVolunteers(ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Entity<ProjectVolunteer>();
            entities.HasKey(x => new { x.ProjectId, x.VolunteerId });
        }

        public void SetPictures(ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Entity<Picture>();
            entities.HasKey(x => x.Id);
            entities.HasOne(x => x.Organization)
                .WithMany(x => x.Pictures)
                .HasForeignKey(x => x.OrganizationId);
            entities.HasOne(x => x.Project)
                .WithMany(x => x.Pictures)
                .HasForeignKey(x => x.ProjectId);
            entities.HasOne(x => x.Volunteer)
                .WithOne(x => x.Picture)
                .HasForeignKey<Volunteer>(x => x.PictureId);
        }
    }
}
