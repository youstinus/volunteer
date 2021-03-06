﻿using System;
using System.Collections.Generic;
using WebAPI.Base;

namespace WebAPI.Models.ViewModels
{
    public class ProjectViewModel : BaseViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string WebsiteUrl { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public ICollection<long> VolunteersIds { get; set; }
        public ICollection<long> PicturesIds { get; set; }
        public long OrganizationId { get; set; }
    }
}
