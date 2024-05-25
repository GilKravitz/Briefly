using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BrieflyServer.Models;
public class Article
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("content")] 
    public string ArticleText { get; set; }

    [Column("category")] 
    public string Category { get; set; }

    [Column("title")]
    public string Title { get; set; }

    [Column("publish_date")]
    public DateTime PublishDate { get; set; }

    [Column("links")]
    public string[] SourceLinks { get; set; }

    [Column("sources")]
    public string[] SourceNames { get; set; }

    [Column("image_url")]
    public string? Image { get; set; }

    [Column("tags")]
    public string[] Tags { get; set; }
}