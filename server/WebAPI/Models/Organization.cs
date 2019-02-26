using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Base;

namespace WebAPI.Models
{
    public class Organization : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string WebsiteUrl { get; set; }
        public ICollection<string> PictureUrls { get; set; }
        public User User { get; set; }
        public ICollection<Project> Projects { get; set; }
        
        public long? UserId { get; set; }
        /*public Owner Owner { get; set; }

        public int OwnerId { get; set; }*/
    }
}
