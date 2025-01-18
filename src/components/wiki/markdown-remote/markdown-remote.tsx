import { MDXRemote } from "next-mdx-remote/rsc";
import { ComponentProps, ReactNode } from "react";
import { Separator } from "@/components/_ui/separator";
import { Checkbox } from "@/components/_ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/_ui/table";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";
import { cn } from "@/lib/utils";

type MDXRemoteProps = ComponentProps<typeof MDXRemote>;

export default function MDXRemoteClient({ components, ...props }: MDXRemoteProps) {
  return (
    <MDXRemote
      components={{
        h1: ({ className, ...props }): ReactNode => (
          <h1 className={cn("mb-2.5 mt-5 text-4xl font-bold", className)} {...props} />
        ),
        h2: ({ className, ...props }): ReactNode => (
          <h2 className={cn("mb-2.5 mt-5 text-3xl font-bold", className)} {...props} />
        ),
        h3: ({ className, ...props }): ReactNode => (
          <h3 className={cn("mb-2.5 mt-5 text-2xl font-bold", className)} {...props} />
        ),
        h4: ({ className, ...props }): ReactNode => (
          <h4 className={cn("my-2.5 text-xl font-bold", className)} {...props} />
        ),
        h5: ({ className, ...props }): ReactNode => (
          <h5 className={cn("my-2.5 text-lg font-bold", className)} {...props} />
        ),
        h6: ({ className, ...props }): ReactNode => (
          <h6 className={cn("my-2.5 text-base font-bold", className)} {...props} />
        ),
        hr: ({ className }): ReactNode => <Separator className={cn("my-5", className)} />,
        a: ({ href, ...props }): ReactNode =>
          href !== undefined && href.startsWith("/") ? (
            <Link className="text-blue-500 hover:underline" {...props} href={href} />
          ) : (
            <a className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
          ),
        input: ({ type, ...props }): ReactNode =>
          type === "checkbox" ? (
            <Checkbox disabled={true} checked={props.checked} className={"disabled:cursor-default"} />
          ) : (
            <input type={type} {...props} />
          ),
        pre: ({ className, children }): ReactNode => (
          <pre
            className={cn(
              "overflow-auto rounded-md bg-slate-800 p-4 font-mono text-sm text-white [&_.hljs-comment]:text-gray-400 [&_.hljs-keyword]:text-blue-500 [&_.hljs-number]:text-blue-400 [&_.hljs-string]:text-green-400 [&_.hljs-title]:text-yellow-400",
              className,
            )}
          >
            {children}
          </pre>
        ),
        table: (props): ReactNode => <Table {...props} suppressHydrationWarning={true} />,
        thead: (props): ReactNode => <TableHeader {...props} />,
        tbody: (props): ReactNode => <TableBody {...props} />,
        tr: (props): ReactNode => <TableRow {...props} />,
        th: (props): ReactNode => <TableHead {...props} />,
        td: (props): ReactNode => <TableCell {...props} />,
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
