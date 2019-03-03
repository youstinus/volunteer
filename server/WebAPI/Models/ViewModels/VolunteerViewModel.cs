using System.Collections.Generic;
using WebAPI.Base;

namespace WebAPI.Models.ViewModels
{
    public class VolunteerViewModel : BaseViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public ICollection<long> ProjectsIds { get; set; }
        public long? PictureId { get; set; }
    }
}
