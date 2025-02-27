import { Button } from "../../ui/button";
import { FiSidebar } from "react-icons/fi";
import { ChevronDown, ChevronRight } from "lucide-react";

interface ISidebarToggleProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: () => void;
}
export default function SidebarToggle({ isSidebarOpen, setIsSidebarOpen }: ISidebarToggleProps) {
  return (
    <div onClick={setIsSidebarOpen} className="flex cursor-pointer select-none items-center gap-x-1 ">
      {isSidebarOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      <span className="text-[16px] select-none">Меню</span>
    </div>
  );
}
