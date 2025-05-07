interface IRatingProps {
    value: string;
    count: number;
    variant?: "sm" | "md" | "lg";
  }
  
  export default function Rating({ value, count, variant = "sm" }: IRatingProps) {
    const classNameMap = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };
  
    return (
      <div className={`flex items-center gap-x-1 ${classNameMap[variant]}`}>
        <span className="text-primary text-lg">★</span>
        <span className="truncate text-muted-foreground">{value}</span>
        <span className="text-muted-foreground">({count})</span>
      </div>
    );
  }
  