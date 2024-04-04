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
    public Article(string articleText, string category, string title)
    {
        ArticleText = articleText;
        Category = category;
        Title = title;
    }
}