import { ComponentProps, type ReactNode } from "react";

import Link from "next/link";

import { Checkbox } from "@/components/_ui/checkbox";
import { Separator } from "@/components/_ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/_ui/table";

import { cn } from "@/lib/utils";

const markdownComponents = {
  h1: ({ className, children, ...props }: ComponentProps<"h1">): ReactNode => (
    <h1 className={cn("mb-2.5 mt-5 text-4xl font-bold", className)} {...props}>
      {children}
    </h1>
  ),
  h2: ({ className, children, ...props }: ComponentProps<"h2">): ReactNode => (
    <h2 className={cn("mb-2.5 mt-5 text-3xl font-bold", className)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ className, children, ...props }: ComponentProps<"h3">): ReactNode => (
    <h3 className={cn("mb-2.5 mt-5 text-2xl font-bold", className)} {...props}>
      {children}
    </h3>
  ),
  h4: ({ className, children, ...props }: ComponentProps<"h4">): ReactNode => (
    <h4 className={cn("my-2.5 text-xl font-bold", className)} {...props}>
      {children}
    </h4>
  ),
  h5: ({ className, children, ...props }: ComponentProps<"h5">): ReactNode => (
    <h5 className={cn("my-2.5 text-lg font-bold", className)} {...props}>
      {children}
    </h5>
  ),
  h6: ({ className, children, ...props }: ComponentProps<"h6">): ReactNode => (
    <h6 className={cn("my-2.5 text-base font-bold", className)} {...props}>
      {children}
    </h6>
  ),
  hr: ({ className }: ComponentProps<"hr">): ReactNode => <Separator className={cn("my-5", className)} />,
  a: ({ href, children, ...props }: ComponentProps<"a">): ReactNode =>
    href?.startsWith("/") ? (
      <Link className="text-blue-500 hover:underline" {...props} href={href}>
        {children}
      </Link>
    ) : (
      <a className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" href={href} {...props}>
        {children}
      </a>
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
  li: ({ className, children, ...props }: ComponentProps<"li">): ReactNode => (
    <li className={cn("list-disc ml-5", className)} {...props}>
      {children}
    </li>
  ),
  p: ({ className, children, ...props }: ComponentProps<"p">): ReactNode => (
    <p className={cn("mb-2.5", className)} {...props}>
      {children}
    </p>
  ),
};

export default markdownComponents;
