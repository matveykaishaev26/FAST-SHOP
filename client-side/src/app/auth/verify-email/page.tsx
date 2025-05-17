// app/auth/reset-password/page.tsx
import { Suspense } from "react";
import VerifyEmailPage from "./VerifyEmailPage";

export default function Page() {
  return (
    <div className="container py-10">
      <Suspense fallback={<div>Загрузка формы сброса пароля...</div>}>
        <VerifyEmailPage />
      </Suspense>
    </div>
  );
}
