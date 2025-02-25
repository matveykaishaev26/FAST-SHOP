"use client";
import { AuthForm } from "@/shared/components/auth/AuthForm";
import { LoginFields } from "./LoginFields";
import { Form } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DASHBOARD_URL, PUBLIC_URL } from "@/config/url.config";
import { useLoginMutation } from "@/features/api/authApi";
import { useRouter } from "next/navigation";
import { IApiError } from "@/shared/types/api.interface";
import ErrorMessage from "@/shared/components/auth/ErrorMessage";
import Link from "next/link";
export default function LoginPage() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [mutate, { data: loginData, isLoading, error }] = useLoginMutation();
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      await mutate({
        email: data.email,
        password: data.password,
      }).unwrap();
      console.log(loginData);
      router.replace(DASHBOARD_URL.root());
    } catch (err) {
      console.log(error);
    }
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
          <LoginFields isPending={isLoading} form={form} />
          {error && <ErrorMessage message={(error as IApiError).data.message} />}

          <Button disabled={isLoading} type="submit" className="w-full">
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
