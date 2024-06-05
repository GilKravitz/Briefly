using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models
{
    public class UpdatePreferredCategoriesRequest
    {
        [Required]
        public string[] PreferredCategories { get; set; }
    }
}
