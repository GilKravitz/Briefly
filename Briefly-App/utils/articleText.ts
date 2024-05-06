import { ArticleText } from "@/types/ArticleText";

export const parseArticleText = (text: string): ArticleText[] => {
  if (!text) return [];

  // Split the text by double newlines to separate into blocks
  const blocks = text.split("\n\n");
  const parsedElements: ArticleText[] = [];

  blocks.forEach((block) => {
    // Check for subheadings marked by **, capture content between ** **
    const subheadingMatch = block.match(/\*\*(.*?)\*\*/);
    // Remove the subheading from the block if present
    const blockWithoutSubheading = subheadingMatch ? block.replace(/\*\*(.*?)\*\*/, "").trim() : block;

    // Get all bullets in the block
    const bullets = blockWithoutSubheading.match(/^\s*\*\s+(.*)/gm)?.map((b) => b.trim().replace(/^\s*\*\s+/, ""));

    if (subheadingMatch) {
      // Add subheading
      parsedElements.push({ subheading: "\n" + subheadingMatch[1] });
    }

    if (bullets && bullets.length > 0) {
      // Add bullets if present
      parsedElements.push({ bullets });
    }

    // If there's remaining text that isn't a subheading or bullets, treat as a paragraph
    const textWithoutBullets = blockWithoutSubheading.replace(/^\s*\*\s+.*$/gm, "").trim();
    if (textWithoutBullets && !subheadingMatch && (!bullets || bullets.length === 0)) {
      parsedElements.push({ paragraph: textWithoutBullets });
    }
  });

  return parsedElements;
};
