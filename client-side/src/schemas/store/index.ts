import * as z from "zod";
export const CreateStoreSchema = z.object({
  title: z.string().min(1, {
    message: "Название обязательно!",
  }),
});
