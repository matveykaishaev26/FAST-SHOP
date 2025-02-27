import Logo from "./Logo";
import ThemeToggle from "../ui/ThemeToggle";
export default function Header() {
  return (
    <div className="border-b px-6 py-4 flex justify-between items-center">
      <Logo />
      <ThemeToggle />
    </div>
  );
}
