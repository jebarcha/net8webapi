using API.Errors;
using System.Net;
using System.Text.Json;

namespace API.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,
        IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = _env.IsDevelopment()
                ? new ApiException((int)HttpStatusCode.InternalServerError, ex.Message,
                ex.StackTrace.ToString())
                : new ApiException((int)HttpStatusCode.InternalServerError);

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
    }

    //private static Task HandleExceptionAsync(HttpContext context, Exception ex, IHostEnvironment env)
    //{
    //    context.Response.ContentType = "application/json";
    //    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

    //    var response = env.IsDevelopment()
    //        ? new ApiErrorResponse(context.Response.StatusCode, ex.Message, ex.StackTrace)
    //        : new ApiErrorResponse(context.Response.StatusCode, ex.Message, "Internal server error");

    //    var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

    //    var json = JsonSerializer.Serialize(response, options);

    //    return context.Response.WriteAsync(json);
    //}
}
