import { ComponentProps, type ReactNode } from "react";

import Link from "next/link";

import { Checkbox } from "@/components/_ui/checkbox";
import { Separator } from "@/components/_ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/_ui/table";

import { cn } from "@/lib/utils";

const markdownComponents = {
  h1: ({ className, ...props }: ComponentProps<"h1">): ReactNode => (
    <h1 className={cn("mb-2.5 mt-5 text-4xl font-bold", className)} {...props} />
  ),
  h2: ({ className, ...props }: ComponentProps<"h2">): ReactNode => (
    <h2 className={cn("mb-2.5 mt-5 text-3xl font-bold", className)} {...props} />
  ),
  h3: ({ className, ...props }: ComponentProps<"h3">): ReactNode => (
    <h3 className={cn("mb-2.5 mt-5 text-2xl font-bold", className)} {...props} />
  ),
  h4: ({ className, ...props }: ComponentProps<"h4">): ReactNode => (
    <h4 className={cn("my-2.5 text-xl font-bold", className)} {...props} />
  ),
  h5: ({ className, ...props }: ComponentProps<"h5">): ReactNode => (
    <h5 className={cn("my-2.5 text-lg font-bold", className)} {...props} />
  ),
  h6: ({ className, ...props }: ComponentProps<"h6">): ReactNode => (
    <h6 className={cn("my-2.5 text-base font-bold", className)} {...props} />
  ),
  hr: ({ className }: ComponentProps<"hr">): ReactNode => <Separator className={cn("my-5", className)} />,
  a: ({ href, ...props }: ComponentProps<"a">): ReactNode =>
    href !== undefined && href.startsWith("/") ? (
      <Link className="text-blue-500 hover:underline" {...props} href={href} />
    ) : (
      <a className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" href={href} {...props} />
    ),
  input: ({ type, ...props }: ComponentProps<"input">): ReactNode =>
    type === "checkbox" ? (
      <Checkbox disabled={true} checked={props.checked} className={"disabled:cursor-default"} />
    ) : (
      <input type={type} {...props} />
    ),
  pre: ({ className, children }: ComponentProps<"pre">): ReactNode => (
    <pre
      className={cn(
        "overflow-auto rounded-md bg-slate-800 p-4 font-mono text-sm text-white [&_.hljs-comment]:text-gray-400 [&_.hljs-keyword]:text-blue-500 [&_.hljs-number]:text-blue-400 [&_.hljs-string]:text-green-400 [&_.hljs-title]:text-yellow-400",
        className,
      )}
    >
      {children}
    </pre>
  ),
  table: (props: ComponentProps<"table">): ReactNode => <Table {...props} suppressHydrationWarning={true} />,
  thead: (props: ComponentProps<"thead">): ReactNode => <TableHeader {...props} />,
  tbody: (props: ComponentProps<"tbody">): ReactNode => <TableBody {...props} />,
  tr: (props: ComponentProps<"tr">): ReactNode => <TableRow {...props} />,
  th: (props: ComponentProps<"th">): ReactNode => <TableHead {...props} />,
  td: (props: ComponentProps<"td">): ReactNode => <TableCell {...props} />,
};

export default markdownComponents;
