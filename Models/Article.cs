using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BrieflyServer.Models;
public class Article
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("article")] // Specify the column name in the database
    public string ArticleText { get; set; }// Rename the property to avoid conflict

    [Column("category")] // Specify the column name in the database
    public string Category { get; set; }

    [Column("title")] // Specify the column name in the database
    public string Title { get; set; }

    [Column("publish_date")]
    public DateTime PublishDate { get; set; }

    [Column("links")]
    public string SourceLinks { get; set; }

    [Column("image")]
    public string? Image { get; set; }
    [Column("s3_image")]
    public string? S3_image { get; set; }
    [NotMapped]
    public List<string> SourceLinksList
    {
        get
        {
            if (string.IsNullOrEmpty(SourceLinks))
            {
                return [];
            }

            return new List<string>(SourceLinks.Split(' '));
        }
    }
}