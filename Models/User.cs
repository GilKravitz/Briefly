﻿using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BrieflyServer.Models
{
    public class User : IdentityUser<int>
    {
        [Key]
        public override int Id { get; set; }

        public virtual ICollection<UserCategory> UserCategories { get; set; }

        public User(string email)
        {
            UserName = email; // Set the username to be the same as the email
            Email = email;
        }
    }
}