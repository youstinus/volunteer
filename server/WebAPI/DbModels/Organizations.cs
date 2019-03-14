using System;
using System.Collections.Generic;

namespace WebAPI.DbModels
{
    public partial class Organizations
    {
        public Organizations()
        {
            Pictures = new HashSet<Pictures>();
            Projects = new HashSet<Projects>();
            Reviews = new HashSet<Reviews>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string WebsiteUrl { get; set; }
        public int UserId { get; set; }

        public virtual Users User { get; set; }
        public virtual ICollection<Pictures> Pictures { get; set; }
        public virtual ICollection<Projects> Projects { get; set; }
        public virtual ICollection<Reviews> Reviews { get; set; }
    }
}
