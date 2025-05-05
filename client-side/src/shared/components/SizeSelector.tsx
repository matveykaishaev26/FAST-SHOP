import React from "react";
import { ISize } from "../types/size.interface";

export interface SizeOption {
  id: string;
  title: string;
  quantity: number;
}

interface SizeSelectorProps {
  sizes: ISize[];
  activeSize: SizeOption | null;
  setActiveSize: (size: SizeOption) => void;
}

export default function SizeSelector({
  sizes,
  activeSize,
  setActiveSize,
}: SizeSelectorProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
      {sizes.map((size) => {
        const isDisabled = size.quantity < 0;
        const isActive = activeSize?.id === size.id;

        return (
          <div
            key={size.id}
            onClick={() => !isDisabled && setActiveSize(size)}
            className={`border rounded-lg flex justify-center items-center cursor-pointer select-none transition aspect-square
              ${isDisabled ? "opacity-50 pointer-events-none" : ""}
              ${isActive ? "border-primary" : "hover:border-primary"}`}
          >
            {size.title}
          </div>
        );
      })}
    </div>
  );
}
