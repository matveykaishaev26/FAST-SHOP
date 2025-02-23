import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export interface IAuthFieldsProps<T extends z.ZodType> {
  form: UseFormReturn<z.infer<T>>;
  isPending?: boolean;
}
