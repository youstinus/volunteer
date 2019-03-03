using AutoMapper;
using WebAPI.Base;
using WebAPI.Models;
using WebAPI.Models.ViewModels;
using WebAPI.Repositories.Interfaces;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services
{
    public class TestService : BaseService<Test, TestViewModel>, ITestService
    {
        public TestService(ITestRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
