import { Checkbox } from "@/shared/components/ui/checkbox";
import { PropsWithChildren } from "react";

interface IFilterCheckboxProps extends PropsWithChildren {
  className?: string;
  id: string;
  onChange: (checked: boolean) => void;
  checked: boolean;
}

export default function FilterCheckbox({ children, className, id, onChange, checked }: IFilterCheckboxProps) {
  return (
    <div className="flex w-full space-x-3">
      <Checkbox
        id={id}
        checked={checked} // ✅ передаём состояние чекбокса
        onCheckedChange={onChange} // ✅ теперь используем `onCheckedChange` из ShadCN UI
        className="w-5 h-5"
      />
      <label htmlFor={id} className={`w-full flex items-center gap-x-2 ${className ?? className}`}>
        {children}
      </label>
    </div>
  );
}
