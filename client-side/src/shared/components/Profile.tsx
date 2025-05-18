"use client";
import { useProfile } from "@/hooks/useProfile";
import { Skeleton } from "./ui/Skeleton/Skeleton";
import { IUser } from "../types/user.interface";
import Link from "next/link";
import { PROFILE_URL } from "@/config/url.config";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface IProfileProps {
  className?: string;
}

export default function Profile({ className }: IProfileProps) {
  const { user, isLoading } = useProfile();
  const pathname = usePathname();
  if (isLoading) {
    return (
      <div className={`flex h-9 w-9 flex-col items-center`}>
        <Skeleton className={`h-9 w-9 ${className ?? ""}`} />
        <span
          className={` group-hover:text-primary  text-[10px] sm:text-xs ${
            pathname === PROFILE_URL.root("") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          Профиль
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-9 w-9 flex-col items-center">
      <Link className={`group flex flex-col items-center  ${className ?? ""}`} href={PROFILE_URL.root()}>
        <Image
          className="rounded-lg object-cover"
          alt={user?.name ?? "твое имя"}
          width={36}
          height={36}
          src={user?.picture && user.picture !== "" ? user.picture : "/images/no-avatar.jpg"}
        />
        <span
          className={` group-hover:text-primary  text-[10px] sm:text-xs ${
            pathname === PROFILE_URL.root("") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          Профиль
        </span>
      </Link>
    </div>
  );
}
