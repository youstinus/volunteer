using WebAPI.ViewModels;

namespace WebAPI.Commands
{
    public interface IPutCarCommand : IAsyncCommand<int, SaveCar>
    {
    }
}
