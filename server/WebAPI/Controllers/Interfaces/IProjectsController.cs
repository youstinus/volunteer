﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Controllers.Interfaces
{
    public interface IProjectsController : IBaseController<Project, ProjectDto>
    {
        Task<IActionResult> GetVolunteersByProjectId([FromRoute]long id);
        Task<IActionResult> GetSavedItems();
        Task<IActionResult> GetSelectedItems();
        Task<IActionResult> GetCreatedItems();
    }
}
