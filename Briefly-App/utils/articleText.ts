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

    //get all paragraphs without subheading and no bullets in the block
    const paragraph = blockWithoutSubheading.replace(/^\s*\*\s+(.*)/gm, "").trim();
    if (paragraph) {
      // Add paragraph if present
      parsedElements.push({ paragraph });
    }
  });

  return parsedElements;
};
