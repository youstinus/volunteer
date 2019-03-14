using System;
using System.Collections.Generic;

namespace WebAPI.DbModels
{
    public partial class Volunteers
    {
        public Volunteers()
        {
            Pictures = new HashSet<Pictures>();
            ProjectVolunteers = new HashSet<ProjectVolunteers>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }

        public virtual Users User { get; set; }
        public virtual ICollection<Pictures> Pictures { get; set; }
        public virtual ICollection<ProjectVolunteers> ProjectVolunteers { get; set; }
    }
}
