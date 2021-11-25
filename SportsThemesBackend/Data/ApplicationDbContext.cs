using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SportsThemesBackend.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SportsThemesBackend.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public DbSet<Theme> Themes { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Coach> Coaches { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Score> Scores { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Theme>().HasData(SampleData.GetThemes());
            modelBuilder.Entity<Team>().HasData(SampleData.GetTeams());
            modelBuilder.Entity<Coach>().HasData(SampleData.GetCoaches());
            modelBuilder.Entity<Player>().HasData(SampleData.GetPlayers());
            modelBuilder.Entity<Score>().HasData(SampleData.GetScores());
        }
    }
}
