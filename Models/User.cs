using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace BrieflyServer.Models;

public class User
{
    [Key]
    public int id { get; set; }
    [Column("email")]
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid Email Address")]
    public string Email { get; set; }
    [Column("password")]
    [Required(ErrorMessage = "Password is required")]
    [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
    public string Password { get; set; }
    [Column("preferredTopics")]
    [Required(ErrorMessage = "Preferred topics are required")]
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
