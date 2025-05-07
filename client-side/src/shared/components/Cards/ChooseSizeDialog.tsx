// components/FavoriteSizeDialog.tsx
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import SizeSelector from "../SizeSelector";
import { ISize } from "@/shared/types/size.interface";
import { IActiveSize } from "../SizeSelector";
import { ReactNode } from "react";

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  sizes?: ISize[];
  activeSize: IActiveSize | null;
  setActiveSize: (size: IActiveSize | null) => void;
  onConfirm: () => void;
  trigger: ReactNode;
}

export default function ChooseSizeDialog({
  open,
  onOpenChange,
  sizes,
  activeSize,
  setActiveSize,
  onConfirm,
  trigger,
}: Props) {
  return (
    <Dialog open={open}  onOpenChange={onOpenChange}>
      {trigger}
      <DialogContent className="sm:max-w-[450px] z-50 h-auto max-w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl">Выберите размер</DialogTitle>
        </DialogHeader>
        {sizes && <SizeSelector setActiveSize={setActiveSize} sizes={sizes} activeSize={activeSize} />}
        <DialogFooter>
          <div className="flex justify-center gap-x-5">
            <Button variant={"outline"} className="uppercase" onClick={() => onOpenChange(false)}>
              ОТМЕНА
            </Button>
            <Button disabled={!activeSize} className="uppercase" type="submit" onClick={onConfirm}>
              ДОБАВИТЬ
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
