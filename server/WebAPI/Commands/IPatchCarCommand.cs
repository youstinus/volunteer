using Microsoft.AspNetCore.JsonPatch;
using WebAPI.ViewModels;

namespace WebAPI.Commands
{
    public interface IPatchCarCommand : IAsyncCommand<int, JsonPatchDocument<SaveCar>>
    {
    }
}
