using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.SqlServer.Server;
using WebAPI.Base;
using WebAPI.Constants;
using WebAPI.Enums;

namespace WebAPI.Models
{
    public class User : BaseEntity
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PasswordHash { get; set; }
        public UserType Type { get; set; } 
        public Volunteer Volunteer { get; set; }
        public Organization Organization { get; set; }

        public long? VolunteerId { get; set; }
        public long? OrganizationId { get; set; }
    }
}
