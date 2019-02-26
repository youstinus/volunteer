using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Base;

namespace WebAPI.Models
{
    public class Project : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string WebsiteUrl { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public ICollection<string> PictureUrls { get; set; }
        public Organization Organization { get; set; }
        public ICollection<ProjectVolunteer> ProjectVolunteers { get; set; }

        public long OrganizationId { get; set; }
    }
}
