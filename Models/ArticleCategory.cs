using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models;

public enum ArticleCategory
{
   Politics,
   Sport,
   Food,
   Economics
}

public class EnumValidationAttribute : ValidationAttribute
{
    public override bool IsValid(object value)
    {
        var categories = value.ToString().Split(' ', StringSplitOptions.RemoveEmptyEntries);
        foreach (var category in categories)
        {
            if (!Enum.TryParse(typeof(ArticleCategory), category.Trim(), out _))
            {
                return false; // Return false if any category is not a valid enum value
            }
        }

        return true;
    }
}