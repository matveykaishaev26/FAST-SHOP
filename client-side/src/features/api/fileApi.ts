import { IFile } from "@/shared/types/file.interface"; // добавьте тип IFile, если еще нет
import { api } from "./api";

export const fileApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Загрузка файла
    uploadFile: build.mutation<IFile[], { file: FormData; folder?: string }>({
      query: ({ file, folder }) => ({
        url: "/files",
        method: "POST",
        data: file,
        params: { folder },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
  }),
});

export const { useUploadFileMutation } = fileApi;
