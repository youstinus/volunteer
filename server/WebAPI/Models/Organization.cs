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
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PictureUrl { get; set; }
        public ICollection<Project> Projects { get; set; }
        public Owner Owner { get; set; }
        public int OwnerId { get; set; }
    }
}
