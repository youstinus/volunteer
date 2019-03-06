using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Controllers.Interfaces;
using WebAPI.Models.DTO;

namespace WebAPI.Controllers
{
    public class TestController : ITestController
    {
        public Task<IActionResult> Get()
        {
            throw new System.NotImplementedException();
        }

        public Task<IActionResult> GetById(long id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IActionResult> Post(TestDto entityDto)
        {
            throw new System.NotImplementedException();
        }

        public Task<IActionResult> Put(long id, TestDto entityDto)
        {
            throw new System.NotImplementedException();
        }

        public Task<IActionResult> Patch(long id, JsonPatchDocument<TestDto> patchDto)
        {
            throw new System.NotImplementedException();
        }

        public Task<IActionResult> Delete(long id)
        {
            throw new System.NotImplementedException();
        }
    }
}
