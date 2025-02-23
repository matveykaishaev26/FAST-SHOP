import { IAuthForm } from "@/shared/types/auth.interface";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMainMutation } from "@/features/api/authApi";
import { AuthEnum } from "@/shared/types/auth.interface";
import { PUBLIC_URL } from "@/config/url.config";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authService } from "@/services/auth/auth.service";
export function useAuthForm() {
  const router = useRouter();

  const form = useForm<IAuthForm>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth user"],
    mutationFn: async (data: IAuthForm) => authService.main("login", data),
    onSuccess() {
      form.reset();
      toast.success("Успешно");
      router.replace(PUBLIC_URL.home());
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    mutate(data);
  };
  return {
    onSubmit,
    form,
    isPending,
  };
}
