"use client";

import React, { Fragment, HTMLAttributes } from "react";
import * as Lucide from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/_ui/popover";
import { FormControl } from "@/components/_ui/form";
import { Button } from "@/components/_ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/_ui/command";
import Icon from "@/components/_ui/icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";

type WikiIconPickerProps = HTMLAttributes<HTMLInputElement> & { value: string; onChange: (value: string) => void };

const IconPicker = (props: WikiIconPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <FormControl>
          <Button variant="outline" role="combobox" className="flex items-center justify-center" size={"icon"}>
            <Icon name={props.value} />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder={"Search icon"} />
          <CommandList>
            <CommandEmpty>No icon found</CommandEmpty>
            <CommandGroup>
              {Object.entries(Lucide).map(([name], i) => {
                if (name.endsWith("Icon")) {
                  const iconName: string = name
                    .replace("Icon", "")
                    .replace(/([A-Z])/g, "-$1")
                    .toLowerCase()
                    .replace(/^-/, "");

                  if (!dynamicIconImports[iconName as keyof typeof dynamicIconImports]) {
                    return <Fragment key={i} />;
                  }

                  return (
                    <CommandItem key={i} onSelect={() => props.onChange(iconName)}>
                      <Icon name={iconName} />
                      {name.replace("Icon", "")}
                    </CommandItem>
                  );
                }
                return <Fragment key={i} />;
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
