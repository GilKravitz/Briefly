namespace BrieflyServer.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Bookmarked
    {
        public Bookmarked(string email, int articleId)
        {
            Email = email;
            ArticleId = articleId;
        }
        [Key] public int Id { get; set; }

        [Column("email")] 
        public string Email { get; set; }

        [Column("articleId")]
        public int ArticleId { get; set; }
    }
}
