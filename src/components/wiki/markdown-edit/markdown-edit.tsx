"use client";

import { ChevronsUpDownIcon, SaveIcon, XIcon } from "lucide-react";
import { type JSX, useCallback, useEffect, useMemo, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/_ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/_ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/_ui/form";
import { Input } from "@/components/_ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/_ui/popover";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/_ui/resizable";
import { Textarea } from "@/components/_ui/textarea";
import IconPicker from "@/components/wiki/icon-picker/icon-picker";
import MarkdownClient from "@/components/wiki/markdown-client/markdown-client";

import create from "@/actions/wiki/create";
import edit from "@/actions/wiki/edit";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CreateUpdateWikiPage, createUpdateWikiPage } from "@/schemas/wiki";
import { Article } from "@/types/article";

import { zodResolver } from "@hookform/resolvers/zod";

type WikiMarkdownEditProps = Readonly<{
  article: Article | null;
  parentArticles: {
    slug: string;
    title: string;
  }[];
}>;

export default function MarkdownEdit({ article, parentArticles }: WikiMarkdownEditProps): JSX.Element {
  const [pending, startTransition] = useTransition();
  const action = article ? edit.bind(null, article.id) : create;
  const { toast } = useToast();
  const router = useRouter();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const markdownRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const isMobile = useIsMobile();

  const defaultSlug = useMemo(() => {
    if (!article) return "/";
    const parts = article.slug.split("/");
    return parts.length > 1 ? parts.slice(0, -1).join("/") : "/";
  }, [article]);

  const form = useForm<CreateUpdateWikiPage>({
    resolver: zodResolver(createUpdateWikiPage),
    defaultValues: {
      label: article?.label || "",
      markdown: article?.markdown || "",
      icon: article?.icon ?? "",
      slug: defaultSlug,
    },
  });

  const handleSubmit = useCallback(
    (data: CreateUpdateWikiPage) => {
      startTransition(async () => {
        const result = await action(data);
        if ("error" in result) {
          toast({ variant: "destructive", description: result.error, title: "An error occurred" });
        } else {
          toast({ description: "The article has been successfully saved", title: "Article saved" });
          router.push(`/${result.slug}`);
        }
      });
    },
    [action, router, toast],
  );

  useEffect(() => {
    if (!textareaRef.current || !markdownRef.current) return;

    resizeObserverRef.current = new ResizeObserver(([entry]) => {
      if (markdownRef.current && !isMobile) {
        markdownRef.current.style.height = `calc(${entry.contentRect.height}px + 2rem)`;
      }
    });
    resizeObserverRef.current.observe(textareaRef.current);

    return () => resizeObserverRef.current?.disconnect();
  }, [isMobile]);

  const markdownValue: string = form.watch("markdown");

  const renderedMarkdown: JSX.Element = useMemo(
    () => <MarkdownClient>{markdownValue}</MarkdownClient>,
    [markdownValue],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{article ? "Edit" : "Create"} page</h2>
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className="flex flex-col text-foreground">
              <FormLabel>Choose a title for this page :</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Label" className="w-full text-foreground" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-wrap gap-4">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="mr-4 flex flex-col text-foreground">
                <FormLabel>Choose an icon for the page :</FormLabel>
                <IconPicker onChange={field.onChange} value={field.value ?? ""} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"slug"}
            render={({ field }) => {
              let parentArticleTitle = "Select parent article";
              if (field.value) {
                const parentArticle = parentArticles.find((article) => article.slug === field.value);
                if (parentArticle) {
                  parentArticleTitle = `Wiki / ${parentArticle.title}`;
                } else {
                  parentArticleTitle = "Wiki";
                }
              }

              return (
              <FormItem className="flex flex-col text-foreground">
                <FormLabel>Choose a parent page for this page :</FormLabel>
                <Popover>
                  <PopoverTrigger asChild={true}>
                    <FormControl>
                      <Button variant="outline" className="w-[300px] justify-between text-foreground">
                        {parentArticleTitle}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search parent article" />
                      <CommandList>
                        <CommandEmpty>No parent article found</CommandEmpty>
                        <CommandGroup>
                          <CommandItem value="/" onSelect={() => form.setValue("slug", "/")}>
                            Wiki
                          </CommandItem>
                          {parentArticles.map((article) => (
                            <CommandItem
                              value={article.slug}
                              key={article.slug}
                              onSelect={() => form.setValue("slug", article.slug)}
                            >
                              {`Wiki / ${article.title}`}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}}
          />
        </div>
        <FormField
          control={form.control}
          name="markdown"
          render={({ field }) => (
            <FormItem className="text-foreground">
              <FormLabel>Write your article in markdown here :</FormLabel>
              {isMobile ? (
                <div className="flex flex-col gap-2">
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write your markdown here"
                      className="h-44 min-h-24 overflow-x-scroll focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      ref={textareaRef}
                    />
                  </FormControl>
                  <div className="h-auto rounded-md border border-input bg-background px-3 py-2" ref={markdownRef}>
                    <MarkdownClient>{field.value}</MarkdownClient>
                  </div>
                </div>
              ) : (
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize={50}>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write your markdown here"
                        className="min-h-96 overflow-x-scroll focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        ref={textareaRef}
                      />
                    </FormControl>
                  </ResizablePanel>
                  <ResizableHandle withHandle={true} className="mx-2" />
                  <ResizablePanel defaultSize={50}>
                    <div
                      className="h-full overflow-auto rounded-md border border-input bg-background px-3 py-2"
                      ref={markdownRef}
                    >
                      {renderedMarkdown}
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="my-4 flex justify-end space-x-4">
          {article && (
            <Link className={cn(buttonVariants({ variant: "destructive", size: "default" }))} href={`/${article.slug}`}>
              <XIcon />
              Cancel
            </Link>
          )}
          <Button type="submit" disabled={pending} size="default" variant="default">
            <SaveIcon />
            {article ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
