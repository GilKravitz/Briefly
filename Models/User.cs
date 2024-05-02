using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BrieflyServer.Models
{
    public class User : IdentityUser<int>
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }

        [Column("preferredTopics")]
        public string PreferredTopics { get; set; }

        public User(string email, string preferredTopics)
        {
            UserName = email; // Set the username to be the same as the email
            Email = email;
            PreferredTopics = preferredTopics;
        }
    }
}