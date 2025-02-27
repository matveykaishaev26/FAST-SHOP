import Logo from "../Logo";
import Tabs from "./Tabs";

interface ISidebarProps {
  className: string;
}
export default function Sidebar({ className }: ISidebarProps) {
  return (
    <div className={`px-6 py-4 h-full flex-col bg-secondary gap-y-10 ${className}`}>
      <Tabs />
    </div>
  );
}
