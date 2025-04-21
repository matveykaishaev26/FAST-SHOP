import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface IInputProps extends React.ComponentProps<"input"> {
  setValue?: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(({ className, type, setValue, ...props }, ref) => {
  const isSearch = type === "search";
  const showClearIcon = isSearch && setValue && props.value;
  return (
    <div className="relative w-full">
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
          isSearch && "pr-9"
        )}
        ref={ref}
        {...props}
      />

      {showClearIcon && (
        <button
          type="button"
          onClick={() => setValue?.("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20 transition"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
