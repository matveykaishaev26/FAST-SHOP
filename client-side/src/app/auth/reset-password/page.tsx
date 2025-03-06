"use client";
import { ResetPasswordFields } from "./ResetPasswordFields";
import { ResetPasswordSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { PUBLIC_URL } from "@/config/url.config";
import Message from "@/app/auth/_components/Message";
import { useResetPasswordMutation } from "@/features/api/authApi";
import { IAuthResetPasswordResponse } from "@/shared/types/auth.interface";
import * as z from "zod";
import { IApiError } from "@/shared/types/api.interface";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AuthForm } from "../_components/AuthForm";
export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | null>(null);
  const [mutate, { data: resetData, isLoading: resetIsLoading, error: resetError }] = useResetPasswordMutation();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    console.log(data);
    if (!token) {
      setError("Ошибка: нет токена для сброса пароля");
      return;
    }
    try {
      await mutate({
        token,
        password: data.password,
      }).unwrap();
      console.log(data);
      form.reset();
    } catch {
      console.log(resetError);
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
          {resetData ? (
            <Message type={"success"} message={(resetData as IAuthResetPasswordResponse).message} />
          ) : (
            <>
              <ResetPasswordFields isPending={resetIsLoading} form={form} />
              {(resetError || error !== null) && (
                <Message type="error" message={String((resetError as IApiError)?.data?.message ?? error ?? "")} />
              )}

              <Button disabled={resetIsLoading} type="submit" className="w-full">
                Обновить пароль
              </Button>
            </>
          )}
        </form>
      </Form>
    </AuthForm>
  );
}
