import { notFound } from "next/navigation";
import Profile from "./Profile";
import { getAccessToken } from "@/services/auth/auth-token.service";

export default function ProfilePage() {
  return (
    <div>
      <Profile />
    </div>
  );
}
