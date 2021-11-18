using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SportsThemesBackend.Models
{
    public enum FontSize
    {
        XLarge,
        Large,
        Medium,
        Small,
        XSmall
    }
    public class Theme
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [DefaultValue("My Theme")]
        [MaxLength()]
        public string Name { get; set; }
        [Required]
        [DefaultValue("#F0F8FF")]
        public string BodyColour { get; set; }
        [Required]
        [DefaultValue("#000000")]
        public string TextColour { get; set; }
        [Required]
        [DefaultValue("#5F9EA0")]
        public string ButtonTextColour { get; set; }
        [Required]
        [DefaultValue("#6495ED")]
        public string ButtonBackgroundColour { get; set; }

        [Required]
        [DefaultValue("#DC143C")]
        public string LinkTextColour { get; set; }
        [Required]
        [DefaultValue(50)]
        public int LinkOpacity { get; set; }

        [Required]
        [DefaultValue("Helvetica")]
        public string Font { get; set; }
        [Required]
        [DefaultValue(FontSize.Medium)]
        public FontSize FontSize { get; set; }

        [Required]
        [DefaultValue("https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/07/attachment_80660538-e1531899559548.jpg?auto=format&q=60&fit=max&w=930")]
        public string Logo { get; set; }
    }
}
