using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class ProjectVolunteer
    {
        public Project Project { get; set; }
        public Volunteer Volunteer { get; set; }

        public long ProjectId { get; set; }
        public long VolunteerId { get; set; }
    }
}
