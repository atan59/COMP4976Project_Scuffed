using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportsThemesBackend.Models
{
    public class Team
    {
        [Key]
        [Required]
        [DefaultValue("My Team")]
        [Display(Name = "Team Name")]
        [MaxLength(100)]
        public string TeamName { get; set; }

        [Required]
        [DefaultValue("City")]
        [Display(Name = "City")]
        public string City { get; set; }

        [Required]
        [Display(Name = "Coach Id")]
        public string CoachId { get; set; }

        [Display(Name = "Theme Id")]
        public Guid ThemeId { get; set; }
    }
}
