"use client";

import { ReactNode } from "react";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/_ui/form";
import { InputBase, InputBaseAdornment, InputBaseControl, InputBaseInput } from "@/components/_ui/input-base";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/_ui/select";
import { Slider } from "@/components/_ui/slider";

import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type BaseFontSectionProps = {
  fontClass: string;
  fontName: string;
  isVariable?: {
    wght?: boolean;
    ital?: boolean;
    wdth?: boolean;
  };
  children?: ReactNode;
};

type FontSectionWithVariableWeight = BaseFontSectionProps & {
  isVariable: { wght: true } & BaseFontSectionProps["isVariable"];
};

type FontSectionWithoutVariableWeight = BaseFontSectionProps & {
  isVariable?: { wght?: false } & BaseFontSectionProps["isVariable"];
  weight: number[];
};

type FontSectionProps = FontSectionWithVariableWeight | FontSectionWithoutVariableWeight;

export default function FontSection({ fontClass, fontName, isVariable, children, ...props }: FontSectionProps) {
  const axes: string[] = Object.entries(isVariable || {}).reduce<string[]>((acc, [key, value]) => {
    if (value) acc.push(key);
    return acc;
  }, []);

  const fontFormSchema = z.object({
    fontsize: z.number().min(10).max(60),
    wght: z.number().min(100).max(900),
    weight: z.number(),
  });

  const form = useForm<z.infer<typeof fontFormSchema>>({
    resolver: zodResolver(fontFormSchema),
    defaultValues: {
      fontsize: 40,
      wght: 400,
      weight: 400,
    },
  });

  return (
    <section className="w-full text-black last-of-type:mb-52">
      <div className="flex w-full items-center justify-center">
        <div className="h-px flex-1 bg-black"></div>
        <h2 className="px-4 font-poppins text-3xl font-bold uppercase tracking-widest">{fontName}</h2>
        <div className="h-px flex-1 bg-black"></div>
      </div>
      <div className={cn("grid min-h-96 grid-cols-1 gap-4 p-4 sm:grid-cols-3", fontClass)}>{children}</div>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
        <Form {...form}>
          <form className="col-span-1 flex w-full flex-col flex-wrap gap-6" onSubmit={(e) => e.preventDefault()}>
            <FormField
              control={form.control}
              name="fontsize"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormControl>
                    <InputBase className="w-full">
                      <InputBaseAdornment>Font Size :</InputBaseAdornment>
                      <InputBaseControl>
                        <InputBaseInput
                          {...field}
                          type="number"
                          onChange={(e) => {
                            const target: HTMLInputElement = e.target as HTMLInputElement;
                            let value: number = target.value === "" ? 0 : parseInt(target.value);
                            if (value > 60) value = 60;
                            form.setValue("fontsize", isNaN(value) ? 0 : value);
                          }}
                          min={10}
                          max={60}
                          step={1}
                          className=""
                        />
                      </InputBaseControl>
                    </InputBase>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {axes.includes("wght") && (
              <FormField
                control={form.control}
                name="wght"
                render={({ field }) => (
                  <FormItem className="flex min-h-10 items-center gap-4 space-y-0 rounded-md border border-input px-3 py-2">
                    <FormLabel className="pointer-events-none flex items-center whitespace-nowrap text-nowrap text-muted-foreground [&_svg]:size-4">
                      Weight :
                    </FormLabel>
                    <FormControl>
                      <Slider
                        min={100}
                        max={900}
                        step={50}
                        defaultValue={[field.value]}
                        onChange={(e) => form.setValue("wght", parseInt((e.target as HTMLInputElement).value))}
                        ref={field.ref}
                        disabled={field.disabled}
                        name={field.name}
                        onBlur={field.onBlur}
                      />
                    </FormControl>{" "}
                    <FormDescription>({form.watch("wght")})</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {"weight" in props && (
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormControl>
                      <Select defaultValue={`${field.value}`}>
                        <SelectTrigger>
                          <SelectValue placeholder="Font Weight :" />
                        </SelectTrigger>
                        <SelectContent>
                          {props.weight.map((weight: number) => (
                            <SelectItem key={weight} value={`${weight}`}>
                              <span className="inlne pointer-events-none mr-2 items-center text-muted-foreground [&_svg]:size-4">
                                Font Weight :
                              </span>
                              <span>{weight}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
        <div className="col-span-1 rounded-md border border-input p-4 md:col-span-2">
          <p
            contentEditable={true}
            suppressContentEditableWarning={true}
            className={cn("h-full text-center text-sm", fontClass)}
            style={{
              fontSize: `${form.watch("fontsize")}px`,
              fontWeight: form.watch("wght"),
              lineHeight: 1,
            }}
          >
            Back in June we delivered oxygen equipment of the same size.
          </p>
        </div>
      </div>
    </section>
  );
}
