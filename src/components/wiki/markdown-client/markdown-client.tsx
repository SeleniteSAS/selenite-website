"use client";

import Markdown from "react-markdown";

import markdownComponents from "@/components/common/markdown/markdown";

import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

type MarkdownClientProps = Readonly<{ children: string }>;

export default function MarkdownClient({ children }: MarkdownClientProps): JSX.Element {
  return (
    <Markdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {children}
    </Markdown>
  );
}
