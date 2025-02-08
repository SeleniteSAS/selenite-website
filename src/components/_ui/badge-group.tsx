"use client";

import { Slottable } from "@radix-ui/react-slot";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { X } from "lucide-react";
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  ElementRef,
  type ForwardedRef,
  type KeyboardEvent,
  type MouseEvent,
  createContext,
  forwardRef,
  useContext,
  useMemo,
} from "react";

import { cn } from "@/lib/utils";

import { composeEventHandlers } from "@radix-ui/primitive";

export type BadgeGroupContextProps =
  | {
      type: "single";
      value: string;
      onValueChange: (value: string) => void;
      onRemove?: (value: string) => void;
    }
  | {
      type: "multiple";
      value: string[];
      onValueChange: (value: string[]) => void;
      onRemove: (value: string[]) => void;
    };

const BadgeGroupContext = createContext<BadgeGroupContextProps>({
  type: "single",
  value: "",
  onValueChange: () => {},
  onRemove: undefined,
});

const useBadgeGroupContext = () => useContext(BadgeGroupContext);

export type BadgeGroupType = "single" | "multiple";

export type BadgeGroupValue<T extends BadgeGroupType = "single"> = T extends "single"
  ? string
  : T extends "multiple"
    ? string[]
    : never;

export type BadgeGroupProps = BadgeGroupSingleProps | BadgeGroupMultipleProps;

export interface BadgeGroupSingleProps extends ToggleGroupPrimitive.ToggleGroupSingleProps {
  onRemove?: (value: string) => void;
}

export interface BadgeGroupMultipleProps extends ToggleGroupPrimitive.ToggleGroupMultipleProps {
  onRemove?: (value: string[]) => void;
}

export const BadgeGroup = forwardRef(
  <T extends BadgeGroupType = "single">(
    {
      type = "single" as T,
      className,
      children,
      onRemove,
      value: valueProp,
      defaultValue,
      onValueChange,
      ...props
    }: BadgeGroupProps,
    ref: ForwardedRef<ElementRef<typeof ToggleGroupPrimitive.Root>>,
  ) => {
    const [value = type === "multiple" ? [] : "", setValue] = useControllableState<BadgeGroupValue<T>>({
      prop: valueProp as BadgeGroupValue<T>,
      defaultProp: defaultValue as BadgeGroupValue<T>,
      onChange: onValueChange as (value: BadgeGroupValue<T>) => void,
    });

    const contextValue = useMemo(
      () => ({
        type,
        onRemove,
        value,
        onValueChange: setValue,
      }),
      [type, onRemove, value, setValue],
    );

    return (
      <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn("flex gap-2", className)}
        {...({
          type,
          value,
          onValueChange: setValue,
        } as ComponentProps<typeof ToggleGroupPrimitive.Root>)}
        {...props}
      >
        <BadgeGroupContext.Provider value={contextValue as BadgeGroupContextProps}>
          <Slottable>{children}</Slottable>
        </BadgeGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    );
  },
);
BadgeGroup.displayName = "BadgeGroup";

export const BadgeGroupItem = forwardRef<
  ElementRef<typeof ToggleGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ value: valueProp, className, ...props }, ref) => {
  const { type, onRemove, value } = useBadgeGroupContext();

  return (
    <BadgeGroupItemImpl
      ref={ref}
      value={valueProp}
      className={cn(
        "group inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[disabled]:pointer-events-none data-[state=on]:border-transparent data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow data-[state=on]:hover:bg-primary/80",
        onRemove && "gap-1 pr-1.5",
        className,
      )}
      onRemove={
        onRemove &&
        ((_, reason) => {
          if (reason === "closeClick") {
            if (type === "single") {
              onRemove(valueProp);
            }
            if (type === "multiple") {
              onRemove([valueProp]);
            }
          } else {
            if (type === "single") {
              onRemove?.(valueProp);
            }
            if (type === "multiple") {
              onRemove?.(value.includes(valueProp) ? value : [valueProp]);
            }
          }
        })
      }
      {...props}
    />
  );
});
BadgeGroupItem.displayName = "BadgeGroupItem";

interface BadgeGroupItemImplProps extends ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> {
  onRemove?: (event: MouseEvent | KeyboardEvent, reason: "closeClick" | "backspaceKeyDown" | "deleteKeyDown") => void;
}

const BadgeGroupItemImpl = forwardRef<ElementRef<typeof ToggleGroupPrimitive.Item>, BadgeGroupItemImplProps>(
  ({ onRemove, onKeyDown, children, ...props }, ref) => (
    <ToggleGroupPrimitive.Item
      ref={ref}
      onKeyDown={composeEventHandlers(onKeyDown, (event) => {
        if (event.key === "Backspace" || event.key === "Delete") {
          onRemove?.(event, event.key === "Backspace" ? "backspaceKeyDown" : "deleteKeyDown");
        }
      })}
      {...props}
    >
      <Slottable>{children}</Slottable>
      {onRemove && (
        <div
          aria-hidden
          onClick={(event) => {
            event.stopPropagation();
            onRemove(event, "closeClick");
          }}
          className="cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100 group-data-[disabled]:pointer-events-none"
        >
          <X className="size-4" />
          <span className="sr-only">Remove</span>
        </div>
      )}
    </ToggleGroupPrimitive.Item>
  ),
);
BadgeGroupItemImpl.displayName = "BadgeGroupItemImpl";
