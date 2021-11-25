using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportsThemesBackend.Models
{
    public class Coach
    {
        [Key]
        [Display(Name = "Coach Id")]
        public string CoachId { get; set; }

        [Required]
        [DefaultValue("Coach Name")]
        [Display(Name = "Coach Name")]
        [MaxLength(100)]
        public string CoachName { get; set;}
    }
}
