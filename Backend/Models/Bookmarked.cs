namespace BrieflyServer.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Bookmarked
    {
        public Bookmarked(string i_Email, int i_ArticleId)
        {
            Email = i_Email;
            ArticleId = i_ArticleId;
        }

        [Key]
        public int Id { get; set; }

        [Column("email")] 
        public string Email { get; set; }

        [Column("articleId")]
        public int ArticleId { get; set; }
    }
}
