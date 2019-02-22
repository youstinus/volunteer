using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Configs
{
    public class VolunteerDbContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<Volunteer> Volunteers { get; set; }
        public DbSet<Owner> Owners { get; set; }

        public VolunteerDbContext(DbContextOptions<VolunteerDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            SetProjects(modelBuilder);
            SetOrganizations(modelBuilder);
            SetVolunteers(modelBuilder);
            SetOwners(modelBuilder);
            base.OnModelCreating(modelBuilder);
        }

        private void SetProjects(ModelBuilder modelBuilder)
        {
            var project = modelBuilder.Entity<Project>();
            project.HasKey(x => x.Id);
            project.HasOne(x => x.Organization)
                .WithMany(pt => pt.Projects)
                .HasForeignKey(pt => pt.OrganizationId)
                .OnDelete(DeleteBehavior.Cascade);
            project.HasOne(x => x.Volunteer)
                .WithMany(pt => pt.InvolvedProjects)
                .HasForeignKey(pt => pt.VolunteerId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public void SetOrganizations(ModelBuilder modelBuilder)
        {
            var organizations = modelBuilder.Entity<Organization>();
            organizations.HasKey(x => x.Id);
            organizations.HasMany(x => x.Projects)
                .WithOne(pt => pt.Organization)
                .HasForeignKey(pt => pt.OrganizationId)
                .OnDelete(DeleteBehavior.Cascade);
            organizations.HasOne(x => x.Owner)
                .WithOne(x => x.Organization)
                .HasForeignKey<Owner>(x => x.OrganizationId);
        }

        public void SetVolunteers(ModelBuilder modelBuilder)
        {
            var users = modelBuilder.Entity<Volunteer>();
            users.HasKey(x => x.Id);
            users.HasMany(x => x.InvolvedProjects)
                .WithOne(x => x.Volunteer)
                .HasForeignKey(x => x.VolunteerId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public void SetOwners(ModelBuilder modelBuilder)
        {
            var users = modelBuilder.Entity<Owner>();
            users.HasKey(x => x.Id);
            users.HasOne(x => x.Organization)
                .WithOne(x => x.Owner)
                .HasForeignKey<Organization>(x => x.OwnerId); // fix
        }
    }
}
