using System;
using System.Data.SqlTypes;

namespace WebAPI.Services.Interfaces
{
    /// <summary>
    /// Retrieves the current date and/or time. Helps with unit testing by letting you mock the system clock.
    /// </summary>
    public interface ITimeService
    {
        DateTimeOffset UtcNow { get; }
        DateTime GetCurrentTime();
        SqlDateTime MinSqlDateTime();
    }
}
