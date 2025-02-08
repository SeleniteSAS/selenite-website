"use client";

import * as Lucide from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { Fragment, HTMLAttributes } from "react";

import { Button } from "@/components/_ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/_ui/command";
import { FormControl } from "@/components/_ui/form";
import Icon from "@/components/_ui/icon";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/_ui/popover";

type WikiIconPickerProps = HTMLAttributes<HTMLInputElement> & { value: string; onChange: (value: string) => void };

const IconPicker = (props: WikiIconPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild={true} className="text-foreground">
        <FormControl>
          <Button variant="outline" className="flex w-[300px] items-center justify-start">
            <Icon name={props.value} />
            <span className="capitalize">
              {props.value
                .replace(/([A-Z])/g, " $1")
                .replace(/^-/, "")
                .replace("Icon", "")
                .replaceAll("-", " ") || "Select icon"}
            </span>
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start" side="bottom">
        <Command>
          <CommandInput placeholder={"Search icon"} />
          <CommandList>
            <CommandEmpty>No icon found</CommandEmpty>
            <CommandGroup>
              {Object.entries(Lucide).map(([name]) => {
                if (name.endsWith("Icon")) {
                  const iconName: string = name
                    .replace("Icon", "")
                    .replace(/([A-Z])/g, "-$1")
                    .toLowerCase()
                    .replace(/^-/, "");

                  if (!dynamicIconImports[iconName as keyof typeof dynamicIconImports]) {
                    return <Fragment key={name} />;
                  }

                  return (
                    <CommandItem key={name} onSelect={() => props.onChange(iconName)}>
                      <Icon name={iconName} />
                      <span className="capitalize">{iconName.replaceAll("-", " ")}</span>
                    </CommandItem>
                  );
                }
                return <Fragment key={name} />;
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
