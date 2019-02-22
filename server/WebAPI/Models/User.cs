using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Base;
using WebAPI.Constants;

namespace WebAPI.Models
{
    public class Volunteer : User
    {
        public ICollection<Project> InvolvedProjects { get; set; }
    }
    public class Owner : User
    {
        public Organization Organization { get; set; }
        public int OrganizationId { get; set; }
    }
    public abstract class User : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PasswordHash { get; set; }
    }
}
