using restAPI_AspNet.Endpoints;
using restAPI_AspNet.Repositories;
using YourProjectNamespace.Data;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>();
builder.Services.AddScoped<IPointRepository, PointRepository>();


ConfigureServices(builder.Services);

builder.WebHost.UseUrls("http://localhost:5000", "https://localhost:5001");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigin");
app.ConfigureEndpoints();
app.Run();

void ConfigureServices(IServiceCollection services)
{
    // Add services to the container.
    services.AddControllersWithViews();
    services.AddRazorPages();

    // Add CORS policy
    services.AddCors(options =>
    {
        options.AddPolicy(name: "AllowSpecificOrigin",
                          builder =>
                          {
                              builder.WithOrigins("http://localhost:3000") // Use the port your React app runs on
                                     .AllowAnyHeader()
                                     .AllowAnyMethod();
                          });
    });
}
