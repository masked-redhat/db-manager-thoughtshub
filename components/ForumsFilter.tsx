"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import PleaseWait from "./PleaseWait";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";

const formSchema = z.object({
  title: z.string(),
  body: z.string(),
});

export default function ForumsFilter({ setValues }: { setValues: Function }) {
  const [loading, setLoading] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState<any>({
    title: false,
    body: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema> | any) => {
    const filters: any = {};
    for (const key in values)
      if (filtersApplied[key] === true) filters[key] = values[key];

    setValues(filters);
  };

  const cfa = (val: boolean | any, name: string) => {
    setFiltersApplied({ ...filtersApplied, [name]: val });
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Forums Filters</SheetTitle>
        <SheetDescription>
          Select the filters you want to apply.
        </SheetDescription>
      </SheetHeader>
      <div className="w-full px-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full px-2.5"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Checkbox
                      checked={filtersApplied["title"]}
                      onCheckedChange={(val) => cfa(val, "title")}
                    />
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Checkbox
                      checked={filtersApplied["body"]}
                      onCheckedChange={(val) => cfa(val, "body")}
                    />
                    Body
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Body" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? <PleaseWait /> : <p>Set filters</p>}
            </Button>
          </form>
        </Form>
      </div>
    </SheetContent>
  );
}
