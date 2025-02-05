export function extractPlainText(markdown: string, maxLength = 200): string {
    const plainText = markdown
      .replace(/!\[.*?\]\(.*?\)/g, "") 
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_~`>#-]/g, "") 
      .replace(/\n+/g, " ")
      .trim();
  
    return plainText.length > maxLength ? plainText.slice(0, maxLength) + "..." : plainText;
  }

export function getFirstImageUrl(markdown: string): string | null {
    const match = markdown.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
  }