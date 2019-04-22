using WebAPI.Base;

namespace WebAPI.Models.DTO
{
    public class TokenDto : BaseDto
    {
        public string Bearer { get; set; }
    }
}
