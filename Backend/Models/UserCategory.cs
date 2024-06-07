using System.ComponentModel.DataAnnotations.Schema;

namespace BrieflyServer.Models
{
    public class UserCategory
    {
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public Categories Category { get; set; }
    }
}
