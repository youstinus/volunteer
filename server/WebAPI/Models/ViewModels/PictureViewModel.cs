﻿using WebAPI.Base;

namespace WebAPI.Models.ViewModels
{
    public class PictureViewModel : BaseViewModel
    {
        public string Title { get; set; }
        public string Url { get; set; }
        public long? ProjectId { get; set; }
        public long? OrganizationId { get; set; }
        public long? VolunteerId { get; set; }
    }
}
