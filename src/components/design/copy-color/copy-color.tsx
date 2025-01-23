"use client";

import { ContextMenuItem } from "@/components/_ui/context-menu";
import { CopyIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ContextMenuItemColorCopyProps = {
  color: string;
  label: string;
};

export default function ContextMenuItemColorCopy({ color, label }: ContextMenuItemColorCopyProps): JSX.Element {
  const { toast } = useToast();

  const handleClick = async (): Promise<void> => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(color);
      toast({
        title: "Copied to clipboard",
        description: color,
        variant: "default",
      });
    } else {
      toast({
        title: "Cannot copy to clipboard",
        description: "Your browser does not support this feature",
        variant: "destructive",
      });
    }
  };

  return (
    <ContextMenuItem className="cursor-pointer" onClick={handleClick}>
      <CopyIcon className="mr-2 size-4" />
      <span>{label}</span>
    </ContextMenuItem>
  );
}
