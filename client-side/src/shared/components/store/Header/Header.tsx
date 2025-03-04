"use client";
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";
import { DASHBOARD_URL } from "@/config/url.config";
import Image from "next/image";
import StoreSwitcher from "./StoreSwitcher";
import Logo from "./Logo";
import { Skeleton } from "../../ui/Skeleton/Skeleton";
import { ThemeToggle } from "../../ui/ThemeToggle";
import { IUser } from "@/shared/types/user.interface";
export default function Header() {
  const { user, isLoading } = useProfile();
  const userData = user as IUser;
  const iconStyle = "h-icon w-icon";
  return (
    <div className="border-b  h-[64px] bg-background px-4 flex justify-between items-center">
      <Logo />

      <div className="flex items-center gap-x-2">
        {/* <StoreSwitcher items={userData.stores} /> */}
        <div>
          {isLoading ? (
            <Skeleton className={iconStyle} />
          ) : (
            <div>
              <Link href={DASHBOARD_URL.home()}>
                <Image
                  className={`${iconStyle} h-9 w-9 rounded-lg`}
                  alt={userData?.name ?? "твое имя"}
                  src={userData?.picture ?? "/public/images/logo.svg"}
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
