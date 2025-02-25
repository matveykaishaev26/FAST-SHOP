"use client";
import { ResetPasswordFields } from "./ResetPasswordFields";
import { ResetPasswordSchema } from "@/schemas";
import { AuthForm } from "@/shared/components/auth/AuthForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { PUBLIC_URL } from "@/config/url.config";
import SuccessMessage from "@/shared/components/auth/SuccessMessage";
import { useResetPasswordMutation } from "@/features/api/authApi";
import { IAuthResetPasswordResponse } from "@/shared/types/auth.interface";
import * as z from "zod";
import ErrorMessage from "@/shared/components/auth/ErrorMessage";
import { IApiError } from "@/shared/types/api.interface";

export default function ForgotPasswordPage() {
  const [mutate, { data, isLoading: sendIsLoading, error }] = useResetPasswordMutation();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    console.log(data);
    try {
      await mutate({
        password: data.password,
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
      description="Введите свой новый пароль"
      header={"Новый пароль"}
    >
      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)} action="">
          {data ? (
            <SuccessMessage message={(data as IAuthResetPasswordResponse).message} />
          ) : (
            <>
              <ResetPasswordFields isPending={sendIsLoading} form={form} />
              {error && <ErrorMessage message={(error as IApiError).data.message} />}

              <Button disabled={sendIsLoading} type="submit" className="w-full">
                Обновить пароль
              </Button>
            </>
          )}
        </form>
      </Form>
    </AuthForm>
  );
}
