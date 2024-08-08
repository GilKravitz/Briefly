using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models
{
    public class Report
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public int ArticleId { get; set; }
        public string Reason { get; set; }
        public DateTime ReportDate { get; set; }
    }
}
