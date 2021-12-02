﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace SportsThemesBackend.Data.Migrations
{
    public partial class AddedTeamName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TeamName",
                table: "Coaches",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TeamName",
                table: "Coaches");
        }
    }
}
