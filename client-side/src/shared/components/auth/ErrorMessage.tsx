import { CircleX } from "lucide-react";
type Props = {
  message: string;
};
export default function ErrorMessage({ message }: Props) {
  return (
    <div className="bg-destructive/30 text-destructive  rounded-lg p-2 w-full flex items-center gap-x-2">
      <CircleX size={15} />
      <span className="text-destructive text-xs">{message}</span>
    </div>
  );
}
