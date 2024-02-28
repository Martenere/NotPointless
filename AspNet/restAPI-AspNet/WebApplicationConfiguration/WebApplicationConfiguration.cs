using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using restAPI_AspNet.Model;
using System.Text;
using YourProjectNamespace.Data;

namespace restAPI_AspNet.WebApplicationConfiguration
{
    public class WebApplicationConfiguration
    {
        static public void ConfigureCORSpolicy(IServiceCollection services)
        {
            // Add CORS policy 
            //This allows the react application so interact with the API
            services.AddCors(options =>
            {
                options.AddPolicy(name: "AllowSpecificOrigin",
                                  builder =>
                                  {
                                      builder.WithOrigins("http://localhost:3000") // The Port of the react app
                                             .AllowAnyHeader()
                                             .AllowAnyMethod();
                                  });
            });
        }
        static public void ConfigureIdentity(WebApplicationBuilder builder)
        {
            builder.Services.AddIdentity<ApplicationUser, IdentityUser>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
                options.SignIn.RequireConfirmedEmail = false;
                options.User.RequireUniqueEmail = false;
                options.Password.RequiredLength = 4;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;

            }
            ).AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<DataContext>();

            var validIssuer = builder.Configuration.GetValue<String>("JwtTokenSettings:ValidIssuer");
            var validAudience = builder.Configuration.GetValue<String>("JwtTokenSettings:ValidAudience");
            var symmetricSecurityKey =
                builder.Configuration.GetValue<string>("JwtTokenSettings:SymmetricSecurityKey");
            builder.Services.AddAuthorization();

            TokenValidationParameters TokenValidationParameters = new TokenValidationParameters()
            {
                ClockSkew = TimeSpan.Zero,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = validIssuer,
                ValidAudience = validAudience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(symmetricSecurityKey)),

            }
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {
                options.IncludeErrorDetails = true;
                options.TokenValidationParameters = TokenValidationParameters;
            })

        }
    }


}
