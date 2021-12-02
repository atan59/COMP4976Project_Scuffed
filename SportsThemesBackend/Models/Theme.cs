using System;
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
        public Guid Id { get; set; }

        [Required]
        [DefaultValue("My Theme")]
        [Display(Name = "Theme Name")]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [DefaultValue("#F0F8FF")]
        [Display(Name = "Body Colour")]
        public string BodyColour { get; set; }

        [Required]
        [DefaultValue("#000000")]
        [Display(Name = "Text Colour")]
        public string TextColour { get; set; }

        [Required]
        [DefaultValue("#5F9EA0")]
        [Display(Name = "Button Text Colour")]
        public string ButtonTextColour { get; set; }

        [Required]
        [DefaultValue("#6495ED")]
        [Display(Name = "Button Background Colour")]
        public string ButtonBackgroundColour { get; set; }

        [Required]
        [DefaultValue("#DC143C")]
        [Display(Name = "Link Text Colour")]
        public string LinkTextColour { get; set; }

        [Required]
        [DefaultValue(50)]
        [Display(Name = "Link Opacity")]
        public int LinkOpacity { get; set; }

        [Required]
        [DefaultValue("Helvetica")]
        [Display(Name = "Font Name")]
        public string Font { get; set; }

        [Required]
        [DefaultValue(FontSize.Medium)]
        [Display(Name = "Header Font Size")]
        public FontSize HeaderFontSize { get; set; }

        [Required]
        [DefaultValue(FontSize.Medium)]
        [Display(Name = "Text Font Size")]
        public FontSize TextFontSize { get; set; }

        [Required]
        [DefaultValue("https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/07/attachment_80660538-e1531899559548.jpg?auto=format&q=60&fit=max&w=930")]
        [Display(Name = "Logo")]
        public string Logo { get; set; }
    }
}
