using Microsoft.AspNetCore.Identity;
using SportsThemesBackend.Models;
using System;
using System.Threading.Tasks;

namespace SportsThemesBackend.Data
{
    public class IdentityDummyData
    {
        public static async Task Initialize(ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager)
        {
            context.Database.EnsureCreated();

            string adminRole = "Admin";
            string adminDesc = "This is the administrator role";

            string coachRole = "Coach";
            string coachDesc = "This is the coach role";

            string playerRole = "Player";
            string playerDesc = "This is the player role";

            string password4all = "P@$$w0rd";

            if (await roleManager.FindByNameAsync(adminRole) == null)
            {
                await roleManager.CreateAsync(new ApplicationRole(adminRole, adminDesc, DateTime.Now));
            }

            if (await roleManager.FindByNameAsync(coachRole) == null)
            {
                await roleManager.CreateAsync(new ApplicationRole(coachRole, coachDesc, DateTime.Now));
            }

            if (await roleManager.FindByNameAsync(playerRole) == null)
            {
                await roleManager.CreateAsync(new ApplicationRole(playerRole, playerDesc, DateTime.Now));
            }

            if (await userManager.FindByNameAsync("admin@test.ca") == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "admin@test.ca",
                    Email = "admin@test.ca",
                    FirstName = "Fred",
                    LastName = "Flintstone",
                    PhoneNumber = "6041234567"
                };

                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password4all);
                    await userManager.AddToRoleAsync(user, adminRole);
                }
            }

            if (await userManager.FindByNameAsync("coach@test.ca") == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "coach@test.ca",
                    Email = "coach@test.ca",
                    FirstName = "Barney",
                    LastName = "Rubble",
                    PhoneNumber = "6042345678"
                };

                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password4all);
                    await userManager.AddToRoleAsync(user, coachRole);
                }
            }

            if (await userManager.FindByNameAsync("player1@test.ca") == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "player1@test.ca",
                    Email = "player1@test.ca",
                    FirstName = "Bambam",
                    LastName = "Rubble",
                    PhoneNumber = "6043456789"
                };

                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password4all);
                    await userManager.AddToRoleAsync(user, playerRole);
                }
            }

            if (await userManager.FindByNameAsync("player2@test.ca") == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "player2@test.ca",
                    Email = "player2@test.ca",
                    FirstName = "Pebbles",
                    LastName = "Flintstone",
                    PhoneNumber = "6044567890"
                };

                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password4all);
                    await userManager.AddToRoleAsync(user, playerRole);
                }
            }
        }
    }
}
