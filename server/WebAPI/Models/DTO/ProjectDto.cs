using System;
using System.Collections.Generic;
using WebAPI.Base;

namespace WebAPI.Models.DTO
{
    public class ProjectDto : BaseDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Website { get; set; }
        public string ImageUrl { get; set; }
        public string Location { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public ICollection<long> VolunteersIds { get; set; }
        public ICollection<long> SavedVolunteersIds { get; set; }
        public ICollection<long> PicturesIds { get; set; }

        // Mapped from User.Id
        public long OrganizationId { get; set; }
    }
}
