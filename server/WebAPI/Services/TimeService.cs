using System;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services
{
    /// <summary>
    /// Retrieves the current date and/or time. Helps with unit testing by letting you mock the system clock.
    /// </summary>
    public class TimeService : ITimeService
    {
        public DateTimeOffset UtcNow => DateTimeOffset.UtcNow;
        public DateTime GetCurrentTime()
        {
            return DateTime.UtcNow;
        }
    }
}
