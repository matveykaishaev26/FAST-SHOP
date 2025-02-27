import { ThemeToggle } from "../ui/ThemeToggle";
import Logo from "./Logo";
export default function Header() {
  return (
    <div className="border-b px-6 py-4 flex justify-between items-center">
      <Logo />
      <ThemeToggle />
    </div>
  );
}
