"use client";
import { saveTokenStorage } from "@/services/auth/auth-token.service";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
export default function Dashboard() {
  const searchParams = useSearchParams();
  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (accessToken) {
      saveTokenStorage(accessToken);
    }
  }, [searchParams]);
  return <div>Dashboard</div>;
}
