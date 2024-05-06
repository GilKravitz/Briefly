import re

def markdown_to_plain_text(markdown_text):
    # Strip headers (any number of # followed by space)
    text = re.sub(r'#+\s+', '', markdown_text)
    # Remove bold (**text** or __text__)
    text = re.sub(r'\*\*(.*?)\*\*|__(.*?)__', r'\1\2', text)
    # Remove italics (*text* or _text_)
    text = re.sub(r'\*(.*?)\*|_(.*?)_', r'\1\2', text)
    # Transform list items
    text = re.sub(r'\n\s*[-*]\s+', '\n• ', text)
    # Remove blockquotes
    text = re.sub(r'\n\s*>\s+', '\n', text)
    # Remove additional Markdown elements like links [text](url)
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    # Remove image syntax ![alt text](image url)
    text = re.sub(r'!\[[^\]]*\]\([^)]+\)', '', text)
    # Remove additional new lines
    text = re.sub(r'\n{3,}', '\n', text)
    
    return text.strip()

# Example usage
markdown_text = """
**נתניהו: ישראל לא תקבל את דרישות חמאס שמשמעותן כניעה**

**נתניהו:**

* "פרסומים מגמתיים גורמים נזק למגעים."
* "כניעה לדרישות חמאס תהיה תבוסה איומה למדינת ישראל."
* "לא נקבל מצב שחמאס ישתלט מחדש על עזה ויחזור לאיים על אזרחינו." """

plain_text = markdown_to_plain_text(markdown_text)

# Path to the text file
file_path = 'output.txt'

# Assuming a line width of 80 characters for right alignment
line_width = 80

# Writing the right-aligned text to a file
with open(file_path, 'w', encoding='utf-8') as file:
    for line in plain_text.split('\n'):
        # Right-align each line by padding with spaces on the left
        aligned_line = line.rjust(line_width)
        file.write(aligned_line + '\n')
