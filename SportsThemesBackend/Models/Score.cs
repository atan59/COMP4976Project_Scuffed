using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportsThemesBackend.Models
{
    public class Score
    {
        [Key]
        [Display(Name = "Score Id")]
        public Guid ScoreId { get; set; }

        [Required]
        [DefaultValue("Game Name")]
        [Display(Name = "Game Name")]
        [MaxLength(100)]
        public string GameName { get; set; }

        [Required]
        [DefaultValue(0)]
        [Display(Name = "Player Score")]
        public int PlayerScore { get; set; }

        [Required]
        [Display(Name = "Player Id")]
        public string PlayerId { get; set; }

        [ForeignKey("PlayerId")]
        public Player Player { get; set; }
    }
}
