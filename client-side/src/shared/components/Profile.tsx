'use client'
import { useProfile } from "@/hooks/useProfile";
import { Skeleton } from "./ui/Skeleton/Skeleton";
import { IUser } from "../types/user.interface";
import Link from "next/link";
import { DASHBOARD_URL } from "@/config/url.config";
import Image from "next/image";
export default function Profile() {
  const { user, isLoading } = useProfile();
  const userData = user as IUser;
  return (
    <div>
      {isLoading ? (
        <Skeleton className={"h-icon w-icon"} />
      ) : (
        <div>
          <Link href={DASHBOARD_URL.home()}>
            <Image
              className={`h-9 w-9 rounded-lg`}
              alt={userData?.name ?? "твое имя"}
              src={userData?.picture ?? "/images/no-avatar.jpg"}
              width={50}
              height={50}
            />
          </Link>
        </div>
      )}
    </div>
  );
}
