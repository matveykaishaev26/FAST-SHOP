"use client";
import { AuthForm } from "@/shared/components/auth/AuthForm";
import { LoginFields } from "./LoginFields";
import { Form } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { LoginSchema } from "@/schemas/auth";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DASHBOARD_URL, PUBLIC_URL } from "@/config/url.config";
import { useLoginMutation } from "@/features/api/authApi";
import { useRouter } from "next/navigation";
import { IApiError } from "@/shared/types/api.interface";
import Message from "@/shared/components/auth/Message";
import { useState } from "react";
import Link from "next/link";
export default function LoginPage() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [mutate, { data: loginData, error }] = useLoginMutation();
  const [loginLoading, setLoginLoading] = useState(false);
  const router = useRouter();
  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setLoginLoading(true);
    mutate({
      email: data.email,
      password: data.password,
    })
      .unwrap()
      .then(() => {
        console.log(loginData);
        router.replace(DASHBOARD_URL.root());
      })
      .catch((err) => {
        setLoginLoading(false);
        if (err instanceof Error) {
          console.error(err.message); // Можно обработать ошибку
        }
      });
  };
  return (
    <AuthForm
      header={"Войти"}
      isContinueIncluded={true}
      description="Зайдите в свой аккаунт и покупайте товары в лучшем онлайн-магазине страны!"
      btnLinkHref={PUBLIC_URL.auth("register")}
      btnLinkText="Нет аккаунта? Зарегестрироваться"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2" action="">
          <LoginFields isPending={loginLoading} form={form} />
          {error && <Message type={"error"} message={(error as IApiError).data.message} />}

          <Button disabled={loginLoading} type="submit" className="w-full">
            Войти
          </Button>
          <div className="w-full flex justify-center">
            <Button variant={"link"} className="text-secondary-foreground/60">
              <Link className="" href={PUBLIC_URL.auth("/forgot-password")}>
                {" "}
                Забыли пароль?
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </AuthForm>
  );
}
