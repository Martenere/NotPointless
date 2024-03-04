using JwtRoleAuthentication.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
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
        public record LoginErrorDTO(string Code, string Description);

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
            List<LoginErrorDTO> errorDTOs = new List<LoginErrorDTO>();
            if (loginPayload.Email.IsNullOrEmpty())
            {
                errorDTOs.Add(new LoginErrorDTO("EmailRequired", "Email is required."));
            }
            if (loginPayload.Password.IsNullOrEmpty())
            {
                errorDTOs.Add(new LoginErrorDTO("PasswordRequired", "Password is required."));
            }
            if (errorDTOs.Any())
            {
                return TypedResults.BadRequest(errorDTOs);
            }

            var user = await userManager.FindByEmailAsync(loginPayload.Email);

            LoginErrorDTO InvalidCredentialDTO = new LoginErrorDTO("InvalidCredentials", "Wrong email or password.");
            if (user == null)
            {
                errorDTOs.Add(InvalidCredentialDTO);
                return TypedResults.BadRequest(errorDTOs);
            }

            var isPasswordValid = await userManager.CheckPasswordAsync(user, loginPayload.Password);
            if (!isPasswordValid)
            {
                errorDTOs.Add(InvalidCredentialDTO);
                return TypedResults.BadRequest(errorDTOs);
            }

            var token = tokenService.CreateToken(user);

            if (!errorDTOs.Any())
            {
                return TypedResults.Ok(new AuthResponseDto(token, user.Email, user.Role));
            }
            else
            {
                return TypedResults.BadRequest(errorDTOs);
            }
        }
    }
}
