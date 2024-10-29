"use client";

import React, { type JSX, useTransition } from "react";
import { Article } from "@/types/article";
import { Textarea } from "@/components/_ui/textarea";
import { Button, buttonVariants } from "@/components/_ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { EditPageSchema, editPageSchema } from "@/schemas/wiki";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/_ui/form";
import { Input } from "@/components/_ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/_ui/popover";
import { ChevronsUpDownIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/_ui/command";
import WikiIconPicker from "@/components/wiki-icon-picker/wiki-icon-picker";
import edit from "@/actions/wiki/edit";

type WikiMarkdownEditProps = {
  article: Article;
  parentArticles: {
    slug: string;
    title: string;
  }[];
};

export default function WikiMarkdownEdit({ article, parentArticles }: WikiMarkdownEditProps): JSX.Element {
  const [pending, startTransition] = useTransition();
  const editWithId = edit.bind(null, article.id);
  const form = useForm<EditPageSchema>({
    resolver: zodResolver(editPageSchema),
    defaultValues: {
      label: article.label,
      markdown: article.markdown,
      icon: article.icon ?? undefined,
      slug: article.slug.split("/").length > 1 ? article.slug.split("/").slice(0, -1).join("/") : "/",
    },
  });

  const handleSubmit = (data: EditPageSchema) => {
    startTransition(async () => {
      const result = await editWithId(data);

      console.log(result);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex items-center">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="mr-4 flex flex-col">
                <FormLabel>Icon</FormLabel>
                <WikiIconPicker onChange={field.onChange} value={field.value ?? ""} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"slug"}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Path</FormLabel>
                <Popover>
                  <PopoverTrigger asChild={true}>
                    <FormControl>
                      <Button variant="outline" role="combobox" className="w-[250px] justify-between">
                        {field.value
                          ? `Wiki${
                              parentArticles.find((article) => article.slug === field.value)
                                ? ` / ${parentArticles.find((article) => article.slug === field.value)?.title}`
                                : ""
                            }`
                          : "Select parent article"}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[250px] p-0">
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
            )}
          />
          <div className="flex h-10 w-8 items-center justify-center self-end">/</div>
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Label" className={"w-[200px]"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-4 grid grid-cols-1">
          <FormField
            control={form.control}
            name="markdown"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Write your markdown here"
                    className="min-h-96 overflow-x-scroll focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-4 flex justify-end space-x-4">
          <Link className={cn(buttonVariants({ variant: "destructive" }), "h-8")} href={`/${article.slug}`}>
            Cancel
          </Link>
          <Button className="h-8" type="submit" disabled={pending}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
