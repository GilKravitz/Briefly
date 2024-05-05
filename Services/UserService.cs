using BrieflyServer.Data;
using BrieflyServer.Models;
using Microsoft.EntityFrameworkCore;

namespace BrieflyServer.Services
{
    public class UserService(BrieflyContext context)
    {
        private readonly BrieflyContext _context = context;

        public string GetPreferredCategories(string email)
        {
            var user = _context.Users
                .FirstOrDefault(user => user.Email == email);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            return user.PreferredTopics;
        }

        public void UpdatePreferredCategories(string email,string categories)
        {
            var user = _context.Users
                .FirstOrDefault(user => user.Email == email);

            if (user == null)
            {
                throw new Exception("User not found");
            }
            user.PreferredTopics = categories;
            _context.SaveChanges();
        }
    }
}
