using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SportsThemesBackend.Areas.Identity.Data;
using SportsThemesBackend.Data;
using SportsThemesBackend.Models;

[assembly: HostingStartup(typeof(SportsThemesBackend.Areas.Identity.IdentityHostingStartup))]
namespace SportsThemesBackend.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<SportsThemesBackendIdentityDbContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("SportsThemesBackendIdentityDbContextConnection")));

                services.AddIdentity<ApplicationUser, ApplicationRole>(
                options =>
                {
                    options.Stores.MaxLengthForKeys = 128;
                })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddRoles<ApplicationRole>()
                .AddDefaultUI()
                .AddDefaultTokenProviders();
            });
        }
    }
}