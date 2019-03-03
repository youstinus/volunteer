﻿using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.ViewModels;

namespace WebAPI.Controllers.Interfaces
{
    public interface IOrganizationsController : IBaseController<Organization, OrganizationViewModel>
    {
    }
}
