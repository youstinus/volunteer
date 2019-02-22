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
        public Organization Organization { get; set; }
        public Volunteer Volunteer { get; set; }

        public int OrganizationId { get; set; }
        public int VolunteerId { get; set; }
    }
}
