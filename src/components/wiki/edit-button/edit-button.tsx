"use client";

import { ComponentProps, ReactNode } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/_ui/button";
import { useSidebar } from "@/components/_ui/sidebar";

import { useToast } from "@/hooks/use-toast";

type EditButtonProps = Omit<ComponentProps<typeof Link>, "href">;

export default function EditButton(props: EditButtonProps): ReactNode {
  const pathname: string = usePathname();
  const { setOpenMobile } = useSidebar();
  const { toast } = useToast();

  const handleClick = () => {
    setOpenMobile(false);
  };

  const handleNewClick = () => {
    toast({
      description: "You can't edit a new article.",
      variant: "destructive",
      title: "Error",
    });

    setOpenMobile(false);
  };

  const handleHomePageClick = () => {
    toast({
      description: "You can't edit the home page.",
      variant: "destructive",
      title: "Error",
    })

    setOpenMobile(false);
  }

  if (pathname === "/new") {
    return (
      <Button className={props.className} onClick={handleNewClick}>
        {props.children}
      </Button>
    );
  }

  if (pathname === "/") {
    return (
      <Button className={props.className} onClick={handleHomePageClick}>
        {props.children}
      </Button>
    );
  }

  return (
    <Link
      {...props}
      href={pathname.includes("/edit") ? pathname.replace("/edit", "") : `${pathname}/edit`}
      onClick={handleClick}
    />
  );
}
