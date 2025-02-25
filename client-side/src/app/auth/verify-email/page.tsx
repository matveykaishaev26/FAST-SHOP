"use client";
import { AuthForm } from "@/shared/components/auth/AuthForm";
import { useVerifyEmailMutation } from "@/features/api/authApi";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@/shared/components/ui/Loading/Loading";
import ErrorMessage from "@/shared/components/auth/ErrorMessage";
import SuccessMessage from "@/shared/components/auth/SuccessMessage";
import { PUBLIC_URL } from "@/config/url.config";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [mutate, { data: verifyData, isLoading, error: verifyError }] = useVerifyEmailMutation();
  const [error, setError] = useState<string | undefined>();

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Токен не найден");
      return;
    }
    try {
      await mutate({ token });
    } catch (err) {
      setError("Ошибка при проверке почты");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      onSubmit();
    } else {
      setError("Токен не найден");
    }
  }, [token, onSubmit]);

  return (
    <AuthForm btnLinkHref={PUBLIC_URL.auth("/login")} btnLinkText="Вернуться на страницу входа" header="Проверка почты">
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : error || verifyError ? (
        <ErrorMessage message={error || verifyError?.message || "Неизвестная ошибка"} />
      ) : verifyData ? (
        <SuccessMessage message={JSON.stringify(verifyData)} />
      ) : null}
    </AuthForm>
  );
}
