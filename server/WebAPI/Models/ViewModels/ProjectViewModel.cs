using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Base;
using WebAPI.Base.Interfaces;

namespace WebAPI.Models.ViewModels
{
    public class ProjectViewModel : BaseViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int OrganizationId { get; set; }
        public int VolunteerId { get; set; }
    }
}
