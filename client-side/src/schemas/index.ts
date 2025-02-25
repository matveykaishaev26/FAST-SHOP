import * as z from "zod";

const PasswordSchema = z.object({
  password: z
    .string()
    .min(6, {
      message: "Пароль должен содержать минимум 6 символов",
    })
    .max(32, {
      message: "Пароль не может быть длиннее 32 символов",
    }),
});

const EmailSchema = z.object({
  email: z.string().email("Пожалуйта, введите корректный email").nonempty("Поле не должно быть пустым"),
});

const AuthMainFieldsSchema = PasswordSchema.merge(EmailSchema);

export const LoginSchema = PasswordSchema.merge(EmailSchema);
export const RegisterSchema = AuthMainFieldsSchema.merge(
  z.object({
    name: z.string({
      required_error: "Имя обязательно",
    }),
  })
);

export const ForgotPasswordSchema = EmailSchema;
export const ResetPasswordSchema = PasswordSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});
