using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Base;
using WebAPI.Enums;

namespace WebAPI.Models.DTO
{
    public class ReviewDto : BaseDto
    {
        public string Title { get; set; }
        public GradeType Grade { get; set; }
        public string Text { get; set; }

        public long OrganizationId { get; set; }
        public long VolunteerId { get; set; }
    }
}
