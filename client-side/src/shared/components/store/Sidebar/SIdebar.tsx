import Logo from "../Logo";
import Tabs from "./Tabs";
export default function Sidebar() {
  return (
    <div className="px-6 py-4  flex-col bg-secondary gap-y-10 hidden md:flex">
      <Tabs />
    </div>
  );
}
