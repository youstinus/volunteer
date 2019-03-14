using System;
using System.Collections.Generic;

namespace WebAPI.DbModels
{
    public partial class ProjectVolunteers
    {
        public int ProjectId { get; set; }
        public int VolunteerId { get; set; }

        public virtual Projects Project { get; set; }
        public virtual Volunteers Volunteer { get; set; }
    }
}
