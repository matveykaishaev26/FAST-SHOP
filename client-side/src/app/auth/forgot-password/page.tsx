"use client";
import { ForgotPasswordFields } from "./ForgotPasswordFields";
import { ForgotPasswordSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { PUBLIC_URL } from "@/config/url.config";
import { useSendPasswordResetMutation } from "@/features/api/authApi";
import { IAuthSendPasswordResetResponse } from "@/shared/types/auth.interface";
import * as z from "zod";
import { IApiError } from "@/shared/types/api.interface";
import Message from "@/app/auth/_components/Message";
import { AuthForm } from "../_components/AuthForm";

export default function ForgotPasswordPage() {
  const [mutate, { data, isLoading: sendIsLoading, error }] = useSendPasswordResetMutation();
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    try {
      await mutate({
        email: data.email,
      }).unwrap();
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
            <Message type={"success"} message={(data as IAuthSendPasswordResetResponse).message} />
          ) : (
            <>
              <ForgotPasswordFields isPending={sendIsLoading} form={form} />
              {error && <Message type={"error"} message={(error as IApiError).data.message} />}

              <Button disabled={sendIsLoading } type="submit" className="w-full">
                Отправить ссылку
              </Button>
            </>
          )}
        </form>
      </Form>
    </AuthForm>
  );
}
