﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using WebAPI.Configurations;

namespace WebAPI.Migrations
{
    [DbContext(typeof(VolunteerDbContext))]
    partial class VolunteerDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("WebAPI.Models.Organization", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<string>("Description");

                    b.Property<string>("Email");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("Phone");

                    b.Property<string>("Title");

                    b.Property<long>("UserId");

                    b.Property<string>("Website");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Organizations");
                });

            modelBuilder.Entity("WebAPI.Models.Picture", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<long?>("OrganizationId");

                    b.Property<long?>("ProjectId");

                    b.Property<string>("Title");

                    b.Property<string>("Url");

                    b.Property<long?>("VolunteerId");

                    b.HasKey("Id");

                    b.HasIndex("OrganizationId");

                    b.HasIndex("ProjectId");

                    b.ToTable("Pictures");
                });

            modelBuilder.Entity("WebAPI.Models.Project", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Email");

                    b.Property<DateTime>("End");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("Location");

                    b.Property<long>("OrganizationId");

                    b.Property<string>("Phone");

                    b.Property<DateTime>("Start");

                    b.Property<string>("Title");

                    b.Property<string>("Website");

                    b.HasKey("Id");

                    b.HasIndex("OrganizationId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("WebAPI.Models.ProjectVolunteer", b =>
                {
                    b.Property<long>("ProjectId");

                    b.Property<long>("VolunteerId");

                    b.HasKey("ProjectId", "VolunteerId");

                    b.HasIndex("VolunteerId");

                    b.ToTable("ProjectVolunteer");
                });

            modelBuilder.Entity("WebAPI.Models.Review", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<int>("Grade");

                    b.Property<long>("OrganizationId");

                    b.Property<string>("Text");

                    b.Property<string>("Title");

                    b.Property<DateTime>("Updated");

                    b.Property<long>("VolunteerId");

                    b.HasKey("Id");

                    b.HasIndex("OrganizationId");

                    b.HasIndex("VolunteerId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("WebAPI.Models.SavedProject", b =>
                {
                    b.Property<long>("ProjectId");

                    b.Property<long>("VolunteerId");

                    b.HasKey("ProjectId", "VolunteerId");

                    b.HasIndex("VolunteerId");

                    b.ToTable("SavedProject");
                });

            modelBuilder.Entity("WebAPI.Models.Token", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Bearer");

                    b.HasKey("Id");

                    b.ToTable("Tokens");
                });

            modelBuilder.Entity("WebAPI.Models.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<string>("Email");

                    b.Property<byte[]>("Hash");

                    b.Property<byte[]>("Salt");

                    b.Property<int>("Type");

                    b.Property<DateTime>("Updated");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebAPI.Models.Volunteer", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("LastName");

                    b.Property<string>("Phone");

                    b.Property<long?>("PictureId");

                    b.Property<long>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("PictureId")
                        .IsUnique();

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Volunteers");
                });

            modelBuilder.Entity("WebAPI.Models.Organization", b =>
                {
                    b.HasOne("WebAPI.Models.User", "User")
                        .WithOne("Organization")
                        .HasForeignKey("WebAPI.Models.Organization", "UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("WebAPI.Models.Picture", b =>
                {
                    b.HasOne("WebAPI.Models.Organization", "Organization")
                        .WithMany("Pictures")
                        .HasForeignKey("OrganizationId");

                    b.HasOne("WebAPI.Models.Project", "Project")
                        .WithMany("Pictures")
                        .HasForeignKey("ProjectId");
                });

            modelBuilder.Entity("WebAPI.Models.Project", b =>
                {
                    b.HasOne("WebAPI.Models.Organization", "Organization")
                        .WithMany("Projects")
                        .HasForeignKey("OrganizationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("WebAPI.Models.ProjectVolunteer", b =>
                {
                    b.HasOne("WebAPI.Models.Project", "Project")
                        .WithMany("ProjectVolunteers")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("WebAPI.Models.Volunteer", "Volunteer")
                        .WithMany("VolunteerProjects")
                        .HasForeignKey("VolunteerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("WebAPI.Models.Review", b =>
                {
                    b.HasOne("WebAPI.Models.Organization", "Organization")
                        .WithMany("Reviews")
                        .HasForeignKey("OrganizationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("WebAPI.Models.Volunteer", "Volunteer")
                        .WithMany("Reviews")
                        .HasForeignKey("VolunteerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("WebAPI.Models.SavedProject", b =>
                {
                    b.HasOne("WebAPI.Models.Project", "Project")
                        .WithMany("SavedVolunteers")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("WebAPI.Models.Volunteer", "Volunteer")
                        .WithMany("SavedProjects")
                        .HasForeignKey("VolunteerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("WebAPI.Models.Volunteer", b =>
                {
                    b.HasOne("WebAPI.Models.Picture", "Picture")
                        .WithOne("Volunteer")
                        .HasForeignKey("WebAPI.Models.Volunteer", "PictureId");

                    b.HasOne("WebAPI.Models.User", "User")
                        .WithOne("Volunteer")
                        .HasForeignKey("WebAPI.Models.Volunteer", "UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });
#pragma warning restore 612, 618
        }
    }
}
