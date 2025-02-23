import { FormField, FormControl, FormItem, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { RegisterSchema } from "@/schemas";
import { IAuthFieldsProps } from "../types/auth-fields.interface";

export function RegisterFields({ form, isPending }: IAuthFieldsProps<typeof RegisterSchema>) {
  return (
    <>
      <FormField
        control={form.control}
        name={"name"}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input disabled={isPending} placeholder="Имя" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
              <Input disabled={isPending} placeholder="Пароль: 6-32 символа" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
