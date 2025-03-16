"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
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
      icon: (
        <Image
          className="w-5  h-5 text-foreground"
          src="/images/yandex-logo.svg"
          alt="github-mark"
          width={15}
          height={15}
        />
      ),
      onClick: () => router.replace(`${process.env.SERVER_URL}/auth/yandex`),
    },
    {
      label: "Github",
      icon: (
        <>
          <Image
            className="w-5  h-5 dark:hidden"
            src="/images/github-mark-black.svg"
            alt="github-mark"
            width={15}
            height={15}
          />
          <Image
            className="w-5 h-5 hidden dark:block"
            src="/images/github-mark-white.svg"
            alt="github-mark"
            width={15}
            height={15}
          />
        </>
      ),
      onClick: () => router.replace(`${process.env.SERVER_URL}/auth/github`),
    },
  ];
  return (
    <div className="space-y-2 w-full">
      {btns.map((btn) => (
        <Button variant={"outline"} className="flex items-center gap-2 w-full" key={btn.label} onClick={btn.onClick}>
          <div className={""}>{btn.icon}</div>
          <span>Продолжить с {btn.label}</span>
        </Button>
      ))}
    </div>
  );
}
