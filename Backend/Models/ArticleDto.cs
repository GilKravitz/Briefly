public class ArticleDto
{
    public int Id { get; set; }
    public string Content { get; set; }
    public string Category { get; set; }
    public string Title { get; set; }
    public DateTime PublishDate { get; set; }
    public string[] SourceLinks { get; set; }
    public string[] SourceNames { get; set; }
    public string? Image { get; set; }
    public string[] Tags { get; set; }
    public bool IsBookmarked { get; set; }
}