import { Check } from "lucide-react";
type Props = {
  message: string;
};
export default function SuccessMessage({ message }: Props) {
  return (
    <div className="bg-success/30 text-success border border-success rounded-lg p-2 w-full flex items-center gap-x-2">
      <Check size={15}/>
      <span className="text-success text-xs">{message}</span>
    </div>
  );
}
