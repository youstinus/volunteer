using System;
using System.Collections.Generic;

namespace WebAPI.DbModels
{
    public partial class Projects
    {
        public Projects()
        {
            Pictures = new HashSet<Pictures>();
            ProjectVolunteers = new HashSet<ProjectVolunteers>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Url { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
        public int OrganizationId { get; set; }

        public virtual Organizations Organization { get; set; }
        public virtual ICollection<Pictures> Pictures { get; set; }
        public virtual ICollection<ProjectVolunteers> ProjectVolunteers { get; set; }
    }
}
