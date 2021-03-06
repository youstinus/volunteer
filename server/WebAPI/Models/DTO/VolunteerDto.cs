﻿using System.Collections.Generic;
using WebAPI.Base;

namespace WebAPI.Models.DTO
{
    public class VolunteerDto : BaseDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        public ICollection<long> ProjectsIds { get; set; }
        public ICollection<long> SavedProjectsIds { get; set; }
        public ICollection<long> ReviewsIds { get; set; }

        public long UserId { get; set; }
        public long? PictureId { get; set; }
    }
}
