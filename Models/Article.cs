using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BrieflyServer.Models;
public class Article
{
    [Key]
    public int id { get; set; }

    [Column("article")] // Specify the column name in the database
    public string ArticleText { get; set; } // Rename the property to avoid conflict

    [Column("category")] // Specify the column name in the database
    public string Category { get; set; }
    [Column("title")] // Specify the column name in the database
    public string Title { get; set; }
    [Column("publish_date")]
    public DateTime PublishDate { get; set; }
    public Article(string articleText, string category, string title, DateTime publishDate)
    {
        ArticleText = articleText;
        Category = category;
        Title = title;
        PublishDate = publishDate;
    }
}