import Link from "next/link";
import Image from "next/image";
import { PUBLIC_URL } from "@/config/url.config";
export default function Logo() {
  return (
    <Link href={PUBLIC_URL.home()} className="w-auto flex items-center gap-x-2">
      <Image src={"/images/logo.svg"} alt={"logo"} width={40} height={40} />
      <span className="text-xl font-bold">fastshop</span>
    </Link>
  );
}
