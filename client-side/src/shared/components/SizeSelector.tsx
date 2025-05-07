import React from "react";
import { ISize } from "../types/size.interface";

interface ISizeSelectorProps {
  sizes: ISize[];
  activeSize: IActiveSize | null;
  setActiveSize: (size: IActiveSize) => void;
}

export interface IActiveSize {
  id: string;
  title: string;
}
export default function SizeSelector({ sizes, activeSize, setActiveSize }: ISizeSelectorProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
      {sizes.map((size) => {
        const isDisabled = size.quantity < 0;
        const isActive = activeSize?.id === size.id;

        return (
          <div
            key={size.id}
            onClick={() => !isDisabled && setActiveSize({ id: size.id, title: size.title })}
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
