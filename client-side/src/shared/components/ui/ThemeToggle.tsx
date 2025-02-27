"use client";
import { useState, useEffect } from "react";
import { Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Sun size={40} />;
  }

  return (
    <Button className="" variant="ghost" size="icon" onClick={toggleTheme}>
      {theme === "dark" ? (
        <Sun size={28} className="text-foreground" />
      ) : (
        <SunMoon size={28} className="text-foreground" />
      )}
    </Button>
  );
}
