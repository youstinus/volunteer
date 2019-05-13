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
        // Mapped from User.Id
        public long VolunteerId { get; set; }
    }
}
