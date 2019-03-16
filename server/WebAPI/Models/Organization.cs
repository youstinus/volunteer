using System.Collections.Generic;
using WebAPI.Base;

namespace WebAPI.Models
{
    public class Organization : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Website { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }

        public User User { get; set; }
        public ICollection<Picture> Pictures { get; set; }
        public ICollection<Project> Projects { get; set; }
        public ICollection<Review> Reviews { get; set; }

        public long UserId { get; set; }
    }
}
