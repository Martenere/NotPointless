using JwtRoleAuthentication.Services;
using Microsoft.OpenApi.Models;
using restAPI_AspNet.Endpoints;
using restAPI_AspNet.Repositories;
using restAPI_AspNet.WebApplicationConfiguration;
using System.Text.Json.Serialization;
using YourProjectNamespace.Data;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>();
builder.Services.AddScoped<IPointRepository, PointRepository>();
builder.Services.AddScoped<TokenService, TokenService>();

builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
//Allow react application to connect with api
WebApplicationConfiguration.ConfigureCORSpolicy(builder.Services);
// Setup Authorization and Authentication
WebApplicationConfiguration.ConfigureIdentity(builder);

builder.WebHost.UseUrls("http://localhost:5000", "https://localhost:5001");

builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Test API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
{
    {
        new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference
            {
                Type=ReferenceType.SecurityScheme,
                Id="Bearer"
            }
        },
        new string[]{}
    }
});
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigin");

app.UseAuthentication();
app.UseAuthorization();

app.ConfigureEndpoints();
app.ConfigureAuthEndpoints();
app.Run();


