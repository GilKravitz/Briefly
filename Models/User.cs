using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BrieflyServer.Models;

public class User
{
    [Key]
    public int id { get; set; }
    [Column("email")]
    public string Email { get; set; }
    [Column("password")]
    public string Password { get; set; }
    [Column("preferredTopics")]
    public string PreferredTopics { get; set; }
    [Column("bookmarkedArticles")]
    public string BookmarkedArticles { get; set; }

    public User(string email, string password, string preferredTopics,string bookmarkedArticles)
    {
        Email = email;
        Password = password;
        PreferredTopics = preferredTopics;
        BookmarkedArticles = bookmarkedArticles;
    }
}
