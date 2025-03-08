"use client";
import { RegisterSchema } from "@/schemas/auth";
import { Form } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFields } from "./RegisterFields";
import { PUBLIC_URL } from "@/config/url.config";
import { useRegisterMutation } from "@/features/api/authApi";
import { IAuthRegisterResponse } from "@/shared/types/auth.interface";
import { IApiError } from "@/shared/types/api.interface";
import Message from "@/app/auth/_components/Message";
import { AuthForm } from "../_components/AuthForm";
export default function RegisterPage() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const [mutate, { data: registerData, isLoading, error }] = useRegisterMutation();
  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      console.log(data);
      await mutate({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();
      console.log(registerData);
      form.reset();
    } catch (err) {
      console.log(error);
    }
  };
  return (
    <AuthForm
      header={"Создать аккаунт"}
      isContinueIncluded={true}
      description="Создайте аккаунт и покупайте товары в лучшем онлайн-магазине страны!"
      btnLinkHref={PUBLIC_URL.auth("login")}
      btnLinkText="Есть аккаунт? Войти"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2" action="">
          {registerData ? (
            <Message type={"success"} message={(registerData as IAuthRegisterResponse).message} />
          ) : (
            <>
              <RegisterFields isPending={isLoading} form={form} />
              {error && <Message type={"error"} message={(error as IApiError).data.message} />}
              <Button disabled={isLoading} type="submit" className="w-full">
                Зарегестрироваться
              </Button>
            </>
          )}
        </form>
      </Form>
    </AuthForm>
  );
}
