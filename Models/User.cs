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
    [Column("preferences")]
    public string Preferences { get; set; }

    public User(string email, string password, string preferences)
    {
        Email = email;
        Password = password;
        Preferences = preferences;
    }
}
