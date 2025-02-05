import { ComponentProps } from "react";

import { MDXRemote } from "next-mdx-remote/rsc";

import markdownComponents from "@/components/common/markdown/markdown";

import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

type MDXRemoteProps = ComponentProps<typeof MDXRemote>;

export default function MDXRemoteClient({ components, ...props }: MDXRemoteProps) {
  return (
    <MDXRemote
      components={{
        ...markdownComponents,
        ...components,
      }}
      options={{
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight],
        },
      }}
      {...props}
    />
  );
}
