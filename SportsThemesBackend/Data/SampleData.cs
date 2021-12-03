using SportsThemesBackend.Models;
using System;
using System.Collections.Generic;

namespace SportsThemesBackend.Data
{
    public class SampleData
    {
        // Creates a list of Themes for sample data
        public static List<Theme> GetThemes()
        {
            List<Theme> themes = new List<Theme>() {
                new Theme() {
                    Id = Guid.Parse("00000000-0000-0000-0000-000000000001"),
                    Name = "Test Theme 1",
                    BodyColour = "#F0F8FF",
                    TextColour = "#000000",
                    ButtonTextColour = "#5F9EA0",
                    ButtonBackgroundColour = "#6495ED",
                    LinkTextColour = "#DC143C",
                    LinkOpacity = 50,
                    Font = "Helvetica",
                    HeaderFontSize = FontSize.Medium,
                    TextFontSize = FontSize.Medium,
                    ListBackgroundColour = "#ffffff",
                    Logo = "https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/07/attachment_80660538-e1531899559548.jpg?auto=format&q=60&fit=max&w=930",
                },
                new Theme() {
                    Id = Guid.Parse("00000000-0000-0000-0000-000000000002"),
                    Name = "Test Theme 2",
                    BodyColour = "#F0F8FF",
                    TextColour = "#000000",
                    ButtonTextColour = "#5F9EA0",
                    ButtonBackgroundColour = "#6495ED",
                    LinkTextColour = "#DC143C",
                    LinkOpacity = 50,
                    Font = "Helvetica",
                    HeaderFontSize = FontSize.Medium,
                    TextFontSize = FontSize.Medium,
                    ListBackgroundColour = "#ffffff",
                    Logo = "https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/07/attachment_80660538-e1531899559548.jpg?auto=format&q=60&fit=max&w=930",
                },
            };

            return themes;
        }

        // Creates a list of Teams for sample data
        public static List<Team> GetTeams()
        {
            List<Team> teams = new List<Team>() {
                new Team() {
                    TeamName = "Test Team 1",
                    City = "Vancouver",
                    CoachId = "c3ec054e-4d44-4517-8d8e-19edfbde3f9a",
                    ThemeId = Guid.Parse("00000000-0000-0000-0000-000000000001"),
                },
            };

            return teams;
        }

        // Creates a list of Coaches for sample data
        public static List<Coach> GetCoaches()
        {
            List<Coach> coaches = new List<Coach>() {
                new Coach() {
                    CoachId = "c3ec054e-4d44-4517-8d8e-19edfbde3f9a",
                    CoachName = "Barney Rubble",
                    TeamName = "Test Team 1",
                },
                new Coach() {
                    CoachId = "10101010-0000-0000-0000-000000000001",
                    CoachName = "Fred Flintstone",
                },
                new Coach() {
                    CoachId = "10101010-0000-0000-0000-000000000002",
                    CoachName = "John Smith",
                },
            };

            return coaches;
        }

        // Creates a list of Players for sample data
        public static List<Player> GetPlayers()
        {
            List<Player> players = new List<Player>() {
                new Player() {
                    PlayerId = "a29e2769-5e6b-4312-bda3-7f861490a85c",
                    PlayerName = "Bambam Rubble",
                    Position = "Test Position 1",
                    TeamName = "Test Team 1",
                },
                new Player() {
                    PlayerId = "e53b635b-6c9f-414f-9c37-b8f33a0e953d",
                    PlayerName = "Pebbles Flintstone",
                    Position = "Test Position 2",
                    TeamName = "Test Team 1",
                },
                new Player() {
                    PlayerId = "e53b635b-6c9f-414f-9c37-b8f33a0e953f",
                    PlayerName = "John Smith",
                    Position = "Small Forward",
                },
                new Player() {
                    PlayerId = "e53b645b-6c9f-414f-9c37-b8f33a0e953r",
                    PlayerName = "Mary Johnson",
                    Position = "Center"
                },
                new Player() {
                    PlayerId = "e53b635b-6c9f-414f-9c37-b8f33f0e953r",
                    PlayerName = "Bob Ross",
                    Position = "Point Guard"
                },
                new Player() {
                    PlayerId = "e53b635b-6c9f-4g4f-9c37-b8g33f0e953r",
                    PlayerName = "Garmin Altec",
                    Position = "Power Forward"
                },
                new Player() {
                    PlayerId = "e53b435b-6c9f-4j4f-9c37-b8g33f0e953r",
                    PlayerName = "Jake Tim",
                    Position = "Shooting Guard"
                },
            };

            return players;
        }

        // Creates a list of Scores for sample data
        public static List<Score> GetScores()
        {
            List<Score> scores = new List<Score>() {
                new Score() {
                    ScoreId = Guid.Parse("00000000-0000-0000-0000-000000000001"),
                    GameName = "Test Game 1",
                    PlayerScore = 5,
                    PlayerId = "a29e2769-5e6b-4312-bda3-7f861490a85c",
                },
                new Score() {
                    ScoreId = Guid.Parse("00000000-0000-0000-0000-000000000002"),
                    GameName = "Test Game 2",
                    PlayerScore = 10,
                    PlayerId = "a29e2769-5e6b-4312-bda3-7f861490a85c",
                },
                new Score() {
                    ScoreId = Guid.Parse("00000000-0000-0000-0000-000000000003"),
                    GameName = "Test Game 1",
                    PlayerScore = 15,
                    PlayerId = "e53b635b-6c9f-414f-9c37-b8f33a0e953d",
                },
                new Score() {
                    ScoreId = Guid.Parse("00000000-0000-0000-0000-000000000004"),
                    GameName = "Test Game 2",
                    PlayerScore = 10,
                    PlayerId = "e53b635b-6c9f-414f-9c37-b8f33a0e953d",
                },
            };

            return scores;
        }
    }
}
