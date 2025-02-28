import { PropsWithChildren, useState } from "react";
import { useCreateStore } from "@/hooks/queries/useCreateStore";
import { IStoreCreate } from "@/shared/types/store.interface";
import { useForm } from "react-hook-form";
import { Dialog, DialogTrigger } from "../ui/dialog";

export default function CreateStoreModal({ children }: PropsWithChildren<unknown>) {
  const [isOpen, setIsOpen] = useState(false);
  const { createStore, isLoading } = useCreateStore();
  const form = useForm<IStoreCreate>({
    mode: "onChange",
    defaultValues: {
      title: "",
    },
  });

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        
      </DialogContent>
    </Dialog>
  );
}
