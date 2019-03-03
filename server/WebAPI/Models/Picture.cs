using WebAPI.Base;

namespace WebAPI.Models
{
    public class Picture : BaseEntity
    {
        public string Title { get; set; }
        public string Url { get; set; }

        public Project Project { get; set; }
        public Organization Organization { get; set; }
        public Volunteer Volunteer { get; set; }

        public long? ProjectId { get; set; }
        public long? OrganizationId { get; set; }
        public long? VolunteerId { get; set; }
    }
}
