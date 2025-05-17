// app/auth/reset-password/page.tsx
import { Suspense } from "react";
import ForgotPasswordPage from "./ForgotPasswordPage";

export default function Page() {
  return (
    <div className="container py-10">
      <Suspense fallback={<div>Загрузка формы сброса пароля...</div>}>
        <ForgotPasswordPage />
      </Suspense>
    </div>
  );
}
