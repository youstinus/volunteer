using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Configurations
{//Scaffold-DbContext "Server=(localdb)\MSSQLLocalDB;Database=Volunteer2;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir DbModels2
    public class VolunteerDbContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<Volunteer> Volunteers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<Review> Reviews { get; set; }

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
            SetSavedProjectsVolunteers(modelBuilder);
            SetPictures(modelBuilder);
            SetReviews(modelBuilder);
            base.OnModelCreating(modelBuilder);
        }

        private void SetProjects(ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Entity<Project>();
            entities.HasKey(x => x.Id);
            entities.HasOne(x => x.Organization)
                .WithMany(pt => pt.Projects)
                .HasForeignKey(pt => pt.OrganizationId);

            // does not need
            entities.HasMany(x => x.ProjectVolunteers)
                .WithOne(pt => pt.Project)
                .HasForeignKey(pt => pt.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);
            entities.HasMany(x => x.SavedVolunteers)
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
            entities.HasOne(x => x.User)
                .WithOne(x => x.Organization)
                .HasForeignKey<Organization>(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // does not need
            entities.HasMany(x => x.Projects)
                .WithOne(pt => pt.Organization)
                .HasForeignKey(pt => pt.OrganizationId)
                .OnDelete(DeleteBehavior.Cascade);
            entities.HasMany(x => x.Pictures)
                .WithOne(x => x.Organization)
                .HasForeignKey(x => x.OrganizationId);
            entities.HasMany(x => x.Reviews)
                .WithOne(x => x.Organization)
                .HasForeignKey(x => x.OrganizationId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public void SetVolunteers(ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Entity<Volunteer>();
            entities.HasKey(x => x.Id);
            entities.HasOne(x => x.User)
                .WithOne(x => x.Volunteer)
                .HasForeignKey<Volunteer>(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // does not need
            entities.HasOne(x => x.Picture)
                .WithOne(x => x.Volunteer)
                .HasForeignKey<Picture>(x => x.VolunteerId);
            entities.HasMany(x => x.VolunteerProjects)
                .WithOne(x => x.Volunteer)
                .HasForeignKey(x => x.VolunteerId)
                .OnDelete(DeleteBehavior.Cascade);
            entities.HasMany(x => x.SavedProjects)
                .WithOne(x => x.Volunteer)
                .HasForeignKey(x => x.VolunteerId)
                .OnDelete(DeleteBehavior.Cascade);
            entities.HasMany(x => x.Reviews)
                .WithOne(x => x.Volunteer)
                .HasForeignKey(x => x.VolunteerId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public void SetUsers(ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Entity<User>();
            entities.HasKey(x => x.Id);
            /*entities.HasOne(x => x.Volunteer)
                .WithOne(x => x.User)
                .HasForeignKey<Volunteer>(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            entities.HasOne(x => x.Organization)
                .WithOne(x => x.User)
                .HasForeignKey<Organization>(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);*/
        }

        public void SetProjectVolunteers(ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Entity<ProjectVolunteer>();
            entities.HasKey(x => new { x.ProjectId, x.VolunteerId });
            entities.HasOne(x => x.Volunteer)
                .WithMany(x => x.VolunteerProjects)
                .HasForeignKey(x => x.VolunteerId)
                .OnDelete(DeleteBehavior.Cascade);
            entities.HasOne(x => x.Project)
                .WithMany(x => x.ProjectVolunteers)
                .HasForeignKey(x => x.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public void SetSavedProjectsVolunteers(ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Entity<SavedProject>();
            entities.HasKey(x => new { x.ProjectId, x.VolunteerId });
            entities.HasOne(x => x.Volunteer)
                .WithMany(x => x.SavedProjects)
                .HasForeignKey(x => x.VolunteerId)
                .OnDelete(DeleteBehavior.Cascade);
            entities.HasOne(x => x.Project)
                .WithMany(x => x.SavedVolunteers)
                .HasForeignKey(x => x.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);
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

        public void SetReviews(ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Entity<Review>();
            entities.HasKey(x => x.Id);
            entities.HasOne(x => x.Volunteer)
                .WithMany(x => x.Reviews)
                .HasForeignKey(x => x.VolunteerId)
                .OnDelete(DeleteBehavior.Cascade);
            entities.HasOne(x => x.Organization)
                .WithMany(x => x.Reviews)
                .HasForeignKey(x => x.OrganizationId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
