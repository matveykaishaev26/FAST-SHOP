import { FormField, FormControl, FormItem, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { ForgotPasswordSchema } from "@/schemas/auth";
import { IAuthFieldsProps } from "../types/auth-fields.interface";
export function ForgotPasswordFields({ form, isPending }: IAuthFieldsProps<typeof ForgotPasswordSchema>) {
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
    </>
  );
}
