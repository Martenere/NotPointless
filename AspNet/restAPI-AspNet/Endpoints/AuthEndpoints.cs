using JwtRoleAuthentication.Services;
using Microsoft.AspNetCore.Identity;
using restAPI_AspNet.Enums;
using restAPI_AspNet.Model;

namespace restAPI_AspNet.Endpoints
{
    public static class AuthEndpoints
    {
        public record RegisterDto(string Email, string Password);
        public record RegisterResponseDto(string Email, UserRole Role);
        public record LoginDto(string Email, string Password);
        public record AuthResponseDto(string Token, string Email, UserRole Role);

        public static void ConfigureAuthEndpoints(this WebApplication app)
        {
            var taskGroup = app.MapGroup("auth");
            taskGroup.MapPost("/register", Register);
            taskGroup.MapPost("/login", Login);
        }

        public async static Task<IResult> Register(RegisterDto registerPayload, UserManager<ApplicationUser> userManager)
        {
            if (registerPayload.Email == null) return TypedResults.BadRequest("Email is required.");
            if (registerPayload.Password == null) return TypedResults.BadRequest("Password is required.");
            var result = await userManager.CreateAsync(
                new ApplicationUser
                {
                    UserName = registerPayload.Email,
                    Email = registerPayload.Email,
                    Role = UserRole.User
                },
                registerPayload.Password!
                );

            if (result.Succeeded)
            {
                return TypedResults.Created($"/auth/", new
                    RegisterResponseDto(registerPayload.Email, UserRole.User));
            }
            return Results.BadRequest(result.Errors);
        }

        public async static Task<IResult> Login(LoginDto loginPayload, UserManager<ApplicationUser> userManager, TokenService tokenService)
        {
            if (loginPayload.Email == null) { return TypedResults.BadRequest("Email is required."); }
            if (loginPayload.Password == null) { return TypedResults.BadRequest("Password is required."); }

            var user = await userManager.FindByEmailAsync(loginPayload.Email);

            string InvalidCredentialString = "Invalid email or password.";
            if (user == null) return TypedResults.BadRequest(InvalidCredentialString);

            var isPasswordValid = await userManager.CheckPasswordAsync(user, loginPayload.Password);
            if (!isPasswordValid) { return TypedResults.BadRequest(InvalidCredentialString); }
            var token = tokenService.CreateToken(user);

            return TypedResults.Ok(new AuthResponseDto(token, user.Email, user.Role));
        }
    }
}
