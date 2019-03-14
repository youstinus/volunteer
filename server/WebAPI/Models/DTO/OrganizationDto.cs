using System.Collections.Generic;
using WebAPI.Base;

namespace WebAPI.Models.DTO
{
    public class OrganizationDto : BaseDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Website { get; set; }

        public long UserId { get; set; }
        public ICollection<long> PicturesIds { get; set; }
        public ICollection<long> ProjectsIds { get; set; }
    }
}
