import { FormField, FormControl, FormItem, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { ResetPasswordSchema } from "@/schemas/auth";
import { IAuthFieldsProps } from "../types/auth-fields.interface";
export function ResetPasswordFields({ form, isPending }: IAuthFieldsProps<typeof ResetPasswordSchema>) {
  return (
    <>
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
      <FormField
        control={form.control}
        name={"confirmPassword"}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input disabled={isPending} placeholder="Повторите пароль" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
