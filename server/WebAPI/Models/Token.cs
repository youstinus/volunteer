using WebAPI.Base;

namespace WebAPI.Models
{
    public class Token : BaseEntity
    {
        public string Bearer { get; set; }
    }
}
