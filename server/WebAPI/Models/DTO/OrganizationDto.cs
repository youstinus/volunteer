using System.Collections.Generic;
using WebAPI.Base;

namespace WebAPI.Models.DTO
{
    public class OrganizationDto : BaseDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string WebsiteUrl { get; set; }
        public ICollection<long> PicturesIds { get; set; }
        public ICollection<long> ProjectsIds { get; set; }
    }
}
