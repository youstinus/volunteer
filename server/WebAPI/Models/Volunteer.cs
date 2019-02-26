using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Base;

namespace WebAPI.Models
{
    public class Volunteer : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public User User { get; set; }
        public ICollection<ProjectVolunteer> VolunteerProjects { get; set; }

        public long? UserId { get; set; }
    }
}
