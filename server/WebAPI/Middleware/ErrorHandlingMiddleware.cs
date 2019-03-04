using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace WebAPI.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            this._next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception e)
            {
                await HandleExceptionAsync(context, e);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = HttpStatusCode.InternalServerError;
            ErrorMessage message;
            if (exception is InvalidOperationException invalidOperationException)
            {
                code = HttpStatusCode.BadRequest;
                message = new ErrorMessage(invalidOperationException.Message);
            }
            else if (exception is ArgumentNullException nullException)
            {
                code = HttpStatusCode.BadRequest;
                message = new ErrorMessage($"Argument {nullException.ParamName} was not set.\n{nullException.Message}");
            }
            else
            {
                message = new ErrorMessage("Unknow internal error");
            }

            var result = JsonConvert.SerializeObject(message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }

        private class ErrorMessage
        {
            public string Message { get; }

            public ErrorMessage(string message)
            {
                Message = message;
            }
        }
    }
}
