using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebAPI.DbModels
{
    /*public partial class Volunteer2Context : DbContext
    {
        public Volunteer2Context()
        {
        }

        public Volunteer2Context(DbContextOptions<Volunteer2Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Organizations> Organizations { get; set; }
        public virtual DbSet<Pictures> Pictures { get; set; }
        public virtual DbSet<ProjectVolunteers> ProjectVolunteers { get; set; }
        public virtual DbSet<Projects> Projects { get; set; }
        public virtual DbSet<Reviews> Reviews { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Volunteers> Volunteers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=BABIS\\SQLEXPRESS;Database=Volunteer2;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.3-servicing-35854");

            modelBuilder.Entity<Organizations>(entity =>
            {
                entity.HasIndex(e => e.UserId)
                    .HasName("UQ__Organiza__1788CC4D3DEB7A9B")
                    .IsUnique();

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.WebsiteUrl)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.User)
                    .WithOne(p => p.Organizations)
                    .HasForeignKey<Organizations>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Organizat__UserI__3A81B327");
            });

            modelBuilder.Entity<Pictures>(entity =>
            {
                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Url)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.Pictures)
                    .HasForeignKey(d => d.OrganizationId)
                    .HasConstraintName("FK__Pictures__Organi__48CFD27E");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.Pictures)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK__Pictures__Projec__46E78A0C");

                entity.HasOne(d => d.Volunteer)
                    .WithMany(p => p.Pictures)
                    .HasForeignKey(d => d.VolunteerId)
                    .HasConstraintName("FK__Pictures__Volunt__47DBAE45");
            });

            modelBuilder.Entity<ProjectVolunteers>(entity =>
            {
                entity.HasKey(e => new { e.ProjectId, e.VolunteerId })
                    .HasName("PK__ProjectV__A10C4802AFA5B26F");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.ProjectVolunteers)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProjectVo__Proje__4BAC3F29");

                entity.HasOne(d => d.Volunteer)
                    .WithMany(p => p.ProjectVolunteers)
                    .HasForeignKey(d => d.VolunteerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProjectVo__Volun__4CA06362");
            });

            modelBuilder.Entity<Projects>(entity =>
            {
                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.End).HasColumnType("date");

                entity.Property(e => e.Phone)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Start).HasColumnType("date");

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Url)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.Projects)
                    .HasForeignKey(d => d.OrganizationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Projects__Organi__412EB0B6");
            });

            modelBuilder.Entity<Reviews>(entity =>
            {
                entity.Property(e => e.Created).HasColumnType("date");

                entity.Property(e => e.Text)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.OrganizationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Reviews__Organiz__440B1D61");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.Created).HasColumnType("date");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Hash).HasMaxLength(255);

                entity.Property(e => e.Salt).HasMaxLength(255);

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Volunteers>(entity =>
            {
                entity.HasIndex(e => e.UserId)
                    .HasName("UQ__Voluntee__1788CC4D6B32E5E2")
                    .IsUnique();

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.User)
                    .WithOne(p => p.Volunteers)
                    .HasForeignKey<Volunteers>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Volunteer__UserI__3E52440B");
            });
        }
    }*/
}
