using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models
{
    public class UpdatePreferredTopicsRequest
    {
        [Required]
        public string[] PreferredTopics { get; set; }
    }
}
