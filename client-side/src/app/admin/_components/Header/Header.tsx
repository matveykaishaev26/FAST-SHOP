"use client";
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";
import { PROFILE_URL } from "@/config/url.config";
import Image from "next/image";
import { IUser } from "@/shared/types/user.interface";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
import { ThemeToggle } from "@/shared/components/ui/ThemeToggle";
import Logo from "@/shared/components/Logo";
export default function Header() {
  const { user, isLoading } = useProfile();
  const userData = user as IUser;
  const iconStyle = "h-icon w-icon";
  return (
    <div className="border-b  h-[64px] bg-background px-4  flex justify-between items-center">
      <Logo />

      <div className="flex items-center gap-x-2">
        <div>
          {isLoading ? (
            <Skeleton className={iconStyle} />
          ) : (
            <div>
              <Link href={PROFILE_URL.root()}>
                <Image
                  className={`${iconStyle} h-9 w-9 rounded-lg`}
                  alt={userData?.name ?? "твое имя"}
                  src={userData?.picture ?? "/images/no-avatar.jpg"}
                  width={50}
                  height={50}
                />
              </Link>
            </div>
          )}
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}
