"use client";
import { AuthForm } from "@/shared/components/auth/AuthForm";
import { LoginFields } from "./LoginFields";
import { Form } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PUBLIC_URL } from "@/config/url.config";
import { useLoginMutation } from "@/features/api/authApi";
import { useRouter } from "next/navigation";
import { ApiError } from "@/shared/types/api.interface";
import ErrorMessage from "@/shared/components/auth/ErrorMessage";
export default function Login() {
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
      router.replace(PUBLIC_URL.home());
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
          {error && <ErrorMessage message={(error as ApiError).data.message} />}

          <Button disabled={isLoading} type="submit" className="w-full">
            Войти
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
}
