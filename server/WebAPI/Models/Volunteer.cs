using System.Collections.Generic;
using WebAPI.Base;

namespace WebAPI.Models
{
    public class Volunteer : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public Picture Picture { get; set; }
        public ICollection<ProjectVolunteer> VolunteerProjects { get; set; }

        public long? PictureId { get; set; }
    }
}
