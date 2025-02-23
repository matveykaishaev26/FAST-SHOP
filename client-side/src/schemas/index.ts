import * as z from "zod";

const AuthMainFieldsSchema = z.object({
  email: z.string().email("Пожалуйта, введите корректный email").nonempty("Поле не должно быть пустым"),
  password: z
    .string()
    .min(6, {
      message: "Пароль должен содержать минимум 6 символов",
    })
    .max(32, {
      message: "Пароль не может быть длиннее 32 символов",
    }),
});

export const LoginSchema = AuthMainFieldsSchema;
export const RegisterSchema = AuthMainFieldsSchema.merge(
  z.object({
    name: z.string( {
      required_error: "Имя обязательно",
    }).min(1, {
      message: "Имя не может быть пусым",
    }),
  })  
);  
