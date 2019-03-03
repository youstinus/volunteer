using System.Collections.Generic;
using WebAPI.Base;

namespace WebAPI.Models
{
    public class Organization : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string WebsiteUrl { get; set; }
        public ICollection<Picture> Pictures { get; set; }
        public ICollection<Project> Projects { get; set; }
    }
}
