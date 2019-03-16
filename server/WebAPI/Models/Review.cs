using System;
using WebAPI.Base;
using WebAPI.Enums;

namespace WebAPI.Models
{
    public class Review : BaseEntity
    {
        public string Title { get; set; }
        public GradeType Grade { get; set; }
        public string Text { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public Organization Organization { get; set; }
        public Volunteer Volunteer { get; set; }

        public long OrganizationId { get; set; }
        public long VolunteerId { get; set; }
    }
}
