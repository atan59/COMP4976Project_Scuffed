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

        public string Name { get; set; }

        public string BodyColour { get; set; }
        public string TextColour { get; set; }

        public string ButtonTextColour { get; set; }
        public string ButtonBackgroundColour { get; set; }

        public string LinkTextColour { get; set; }
        public int LinkOpacity { get; set; }

        public string Font { get; set; }
        public FontSize FontSize { get; set; }

        public string Logo { get; set; }
    }
}
