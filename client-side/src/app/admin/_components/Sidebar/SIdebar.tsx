import Tabs from "./Tabs";

export default function Sidebar() {
  return (
    <div className={`p-4 h-full flex-col bg-secondary gap-y-10 `}>
      <Tabs />
    </div>
  );
}
