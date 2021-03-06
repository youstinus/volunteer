﻿using System.Collections.Generic;
using WebAPI.Base;

namespace WebAPI.Models
{
    public class Volunteer : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        public Picture Picture { get; set; }
        public User User { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<ProjectVolunteer> VolunteerProjects { get; set; }
        public ICollection<SavedProject> SavedProjects { get; set; }

        public long? PictureId { get; set; }
        public long UserId { get; set; }
    }
}
