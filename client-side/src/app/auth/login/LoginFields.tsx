import { FormField, FormControl, FormItem, FormMessage } from "@/shared/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { LoginSchema } from "@/schemas";
import { z } from "zod";
type LoginFieldsProps = {
  form: UseFormReturn<z.infer<typeof LoginSchema>>;
  isPending?: boolean;
};
export function LoginFields({ form, isPending }: LoginFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name={"email"}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input disabled={isPending} placeholder="Почта" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"password"}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input disabled={isPending} placeholder="Пароль" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
