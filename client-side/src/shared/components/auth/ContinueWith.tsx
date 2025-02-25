"use client";
import { Button } from "../ui/button";
import { FaYandex } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
type ContinueWithBtn = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
};

export function ContinueWith() {
  const router = useRouter();
  const btns: ContinueWithBtn[] = [
    {
      label: "Яндекс",
      icon: <FaYandex color={"#ff0000"} size={20} />,
      onClick: () => router.replace(`${process.env.SERVER_URL}/auth/yandex`),
    },
    {
      label: "Github",

      icon: <FaGithub size={20} />,
      onClick: () => router.replace(`${process.env.SERVER_URL}/auth/github`),
    },
  ];
  return (
    <div className="space-y-2 w-full">
      {btns.map((btn) => (
        <Button variant={"outline"} className="flex items-center gap-2 w-full" key={btn.label} onClick={btn.onClick}>
          {btn.icon}
          <span>Продолжить с {btn.label}</span>
        </Button>
      ))}
    </div>
  );
}
