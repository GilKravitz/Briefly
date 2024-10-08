﻿namespace BrieflyServer.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Bookmarked
    {
        [Key]
        public int Id { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("articleId")]
        public int ArticleId { get; set; }

        public Bookmarked(string email, int articleId)
        {
            Email = email;
            ArticleId = articleId;
        }
    }
}
