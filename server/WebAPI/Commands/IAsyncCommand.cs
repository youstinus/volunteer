﻿using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Commands
{
    public interface IAsyncCommand
    {
        /// <summary>
        /// Executes the command asynchronously.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <returns>The result of the command.</returns>
        Task<IActionResult> ExecuteAsync(CancellationToken cancellationToken = default(CancellationToken));
    }

    /// <summary>
    /// Executes a single command with one parameter and returns a result.
    /// </summary>
    /// <typeparam name="T">The type of the parameter.</typeparam>
    public interface IAsyncCommand<T>
    {
        /// <summary>
        /// Executes the command asynchronously.
        /// </summary>
        /// <param name="parameter">The parameter.</param>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <returns>The result of the command.</returns>
        Task<IActionResult> ExecuteAsync(T parameter, CancellationToken cancellationToken = default(CancellationToken));
    }

    /// <summary>
    /// Executes a single command with two parameters and returns a result.
    /// </summary>
    /// <typeparam name="T1">The type of the first parameter.</typeparam>
    /// <typeparam name="T2">The type of the second parameter.</typeparam>
    public interface IAsyncCommand<T1, T2>
    {
        /// <summary>
        /// Executes the command asynchronously.
        /// </summary>
        /// <param name="parameter1">The first parameter.</param>
        /// <param name="parameter2">The second parameter.</param>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <returns>The result of the command.</returns>
        Task<IActionResult> ExecuteAsync(T1 parameter1, T2 parameter2, CancellationToken cancellationToken = default(CancellationToken));
    }
}
