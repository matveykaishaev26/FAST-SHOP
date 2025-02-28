import Logo from "../Header/Logo";
import Tabs from "./Tabs";

// interface ISidebarProps {
//   className: string;
// }
export default function Sidebar() {
  return (
    <div className={`p-4 h-full flex-col bg-secondary gap-y-10 `}>
      <Tabs />
    </div>
  );
}
