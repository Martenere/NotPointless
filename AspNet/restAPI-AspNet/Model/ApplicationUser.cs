using Microsoft.AspNetCore.Identity;
using restAPI_AspNet.Enums;

namespace restAPI_AspNet.Model
{
    public class ApplicationUser : IdentityUser
    {
        // Ability to extend the default userClass that comes with aspNet identity
        public UserRole Role;
    }
}

namespace restAPI_AspNet.Enums
{
    public enum UserRole
    {
        Admin,
        User,
    }
}
