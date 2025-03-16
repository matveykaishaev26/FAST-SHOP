import { Checkbox } from "@/shared/components/ui/checkbox";
import { PropsWithChildren, ReactNode } from "react";

interface IFilterItemProps extends PropsWithChildren {
  className?: string;
  id: string;
}
export default function FilterItem({ children, className, id }: IFilterItemProps) {
  return (
    <div className="flex  w-full space-x-3">
      <Checkbox className="w-5 h-5" id={id} />
      <label htmlFor={id} className={`w-full flex items-center gap-x-2 ${className ?? className}`}>
        {children}
      </label>
    </div>
  );
}
