import { PropsWithChildren, useState } from "react";
import { useCreateStore } from "@/hooks/queries/useCreateStore";
import { IStoreCreate } from "@/shared/types/store.interface";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../ui/form";
import { Button } from "../../ui/button";
import { CreateStoreSchema } from "@/schemas/store";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export default function CreateStoreModal({ children }: PropsWithChildren<unknown>) {
  const { createStore, isLoading } = useCreateStore();
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
                    <Input placeholder="Название" {...field} />
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
