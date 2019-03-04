using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Controllers.Interfaces
{
    public interface ITestController : IBaseController<Test, TestDto>
    {
    }
}
