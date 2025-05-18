interface IImagesIndicatorsProps {
  length: number;
  setCurrent?: (ids: number) => void;
  current: number;
  variant?: "md" | "sm";
}
export default function ImagesIndicators({ length, setCurrent, current, variant = "sm" }: IImagesIndicatorsProps) {
  const className = {
    sm: "h-[5px] w-[5px]",
    md: "h-[8px] w-[8px]",
  };
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      {[...Array(length)].map((_, idx) => (
        <div
          key={idx}
          onClick={() => setCurrent?.(idx)}
          className={`${className[variant]} cursor-pointer rounded-full ${
            current === idx ? "bg-primary" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
