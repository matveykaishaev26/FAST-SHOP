import { Check, CircleX } from "lucide-react";

type MessageProps = {
  message: string;
  type: "success" | "error";
};

export default function Message({ message, type }: MessageProps) {
  const isSuccess = type === "success";

  return (
    <div
      className={`${
        isSuccess ? "bg-success/30 text-success" : "bg-destructive/30 text-destructive"
      } rounded-lg py-4 px-2 w-full flex items-center gap-x-2`}
    >
      {isSuccess ? <Check size={15} /> : <CircleX size={15} />}
      <span className="text-xs">{message}</span>
    </div>
  );
}
