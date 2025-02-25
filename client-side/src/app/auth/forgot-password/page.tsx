"use client";
import { ForgotPasswordFields } from "./ForgotPasswordFields";
import { ForgotPasswordSchema } from "@/schemas";
import { AuthForm } from "@/shared/components/auth/AuthForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { PUBLIC_URL } from "@/config/url.config";
import { useSendPasswordResetMutation } from "@/features/api/authApi";
import SuccessMessage from "@/shared/components/auth/SuccessMessage";
import { IAuthSendPasswordResetResponse } from "@/shared/types/auth.interface";
import * as z from "zod";
import ErrorMessage from "@/shared/components/auth/ErrorMessage";
import { IApiError } from "@/shared/types/api.interface";

export default function ForgotPasswordPage() {
  const [mutate, { data, isLoading: sendIsLoading, error }] = useSendPasswordResetMutation();
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    console.log(data);
    try {
      await mutate({
        email: data.email,
      }).unwrap();
      console.log(data);
      form.reset();
    } catch {
      console.log(error);
    }
  };
  return (
    <AuthForm
      btnLinkHref={PUBLIC_URL.auth("/login")}
      btnLinkText="Вернуться на страницу входа"
      description="Напишите свою почту для восстановления пароля"
      header={"Восстановление пароля"}
    >
      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)} action="">
          {data ? (
            <SuccessMessage message={(data as IAuthSendPasswordResetResponse).message} />
          ) : (
            <>
              <ForgotPasswordFields isPending={sendIsLoading} form={form} />
              {error && <ErrorMessage message={(error as IApiError).data.message} />}

              <Button disabled={sendIsLoading} type="submit" className="w-full">
                Отправить ссылку
              </Button>
            </>
          )}
        </form>
      </Form>
    </AuthForm>
  );
}
