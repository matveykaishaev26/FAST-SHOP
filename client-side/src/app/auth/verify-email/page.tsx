"use client";
import { useVerifyEmailMutation } from "@/features/api/authApi";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@/shared/components/ui/Loading/Loading";
import { PUBLIC_URL } from "@/config/url.config";
import { IAuthVerifyEmailResponse } from "@/shared/types/auth.interface";
import { IApiError } from "@/shared/types/api.interface";
import Message from "@/app/auth/_components/Message";
import { AuthForm } from "../_components/AuthForm";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [mutate, { data: verifyData, error: verifyError }] = useVerifyEmailMutation();
  const [error, setError] = useState<string | null>(null);
  const [loadingStarted, setLoadingStarted] = useState(true); // новое состояние для контроля начала загрузки

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError("Токен не найден");
        return;
      }
      try {
        setLoadingStarted(true); // Устанавливаем сразу
        await mutate({ token }).unwrap();
      } catch (err) {
        const apiError = err as IApiError;
        setError(apiError?.data?.message || "Ошибка при проверке почты");
      } finally {
        setLoadingStarted(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setError("Токен не найден");
    }
  }, [token]);

  return (
    <AuthForm btnLinkHref={PUBLIC_URL.auth("/login")} btnLinkText="Вернуться на страницу входа" header="Проверка почты">
      {loadingStarted ? (
        <div className="flex justify-center">
          <Loading loading={loadingStarted} />
        </div>
      ) : error || verifyError ? (
        <Message type="error" message={error ?? (verifyError as IApiError)?.data?.message ?? "Произошла ошибка"} />
      ) : verifyData ? (
        <Message type="success" message={(verifyData as IAuthVerifyEmailResponse).message} />
      ) : null}
    </AuthForm>
  );
}
