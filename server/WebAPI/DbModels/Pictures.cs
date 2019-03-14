using System;
using System.Collections.Generic;

namespace WebAPI.DbModels
{
    public partial class Pictures
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public int? ProjectId { get; set; }
        public int? VolunteerId { get; set; }
        public int? OrganizationId { get; set; }

        public virtual Organizations Organization { get; set; }
        public virtual Projects Project { get; set; }
        public virtual Volunteers Volunteer { get; set; }
    }
}
