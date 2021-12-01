using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportsThemesBackend.Models
{
    public class Player
    {
        [Key]
        [Display(Name = "Player Id")]
        public string PlayerId { get; set; }

        [Required]
        [DefaultValue("Player Name")]
        [Display(Name = "Player Name")]
        [MaxLength(100)]
        public string PlayerName { get; set; }

        [Required]
        [DefaultValue("Position")]
        [Display(Name = "Position")]
        [MaxLength(100)]
        public string Position { get; set; }

        [DefaultValue("My Team")]
        [Display(Name = "Team Name")]
        [MaxLength(100)]
        public string TeamName { get; set; }
    }
}
