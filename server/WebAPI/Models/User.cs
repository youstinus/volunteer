using System;
using WebAPI.Base;
using WebAPI.Enums;

namespace WebAPI.Models
{
    public class User : BaseEntity
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public UserType Type { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime? Created { get; set; }

        public Volunteer Volunteer { get; set; }
        public Organization Organization { get; set; }

        public long? VolunteerId { get; set; }
        public long? OrganizationId { get; set; }
    }
}
