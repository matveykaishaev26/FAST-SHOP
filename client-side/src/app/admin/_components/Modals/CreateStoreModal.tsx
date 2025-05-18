import { PropsWithChildren, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { CreateStoreSchema } from "@/schemas/store";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { DialogHeader } from "@/shared/components/ui/dialog";
import { FormField, FormItem, FormControl, FormMessage } from "@/shared/components/ui/form";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Input } from "postcss";
export default function CreateStoreModal({ children }: PropsWithChildren<unknown>) {
  const form = useForm<z.infer<typeof CreateStoreSchema>>({
    resolver: zodResolver(CreateStoreSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = () => {};

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          form.reset(); 
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Создать магазин</DialogTitle>
          <DialogDescription className="text-center">Создайте свой магазин для продажи товаров</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name={"title"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Создать</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
