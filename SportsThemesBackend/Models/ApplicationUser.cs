using Microsoft.AspNetCore.Identity;

namespace SportsThemesBackend.Models
{
    public class ApplicationUser: IdentityUser
    {
        public ApplicationUser(): base() { }

        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
