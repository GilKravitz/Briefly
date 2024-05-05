using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models
{
    public class UpdatePreferredTopicsRequest
    {
        [Required]
        [EnumValidation(ErrorMessage = "Invalid category")]
        public string PreferredTopics { get; set; }
    }
}
