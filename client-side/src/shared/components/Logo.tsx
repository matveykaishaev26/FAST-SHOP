import Link from "next/link";
import Image from "next/image";
import { PUBLIC_URL } from "@/config/url.config";

// interface ILogoProps {
//   variant?: "black" | "white";
// }
export default function Logo() {
  return (
    <Link href={PUBLIC_URL.home()} className="flex flex-shrink-0 w-auto items-center gap-x-2 select-none">
      <Image priority src={"/images/logo.svg"} alt={"logo"} width={40} height={40} />
      <span className={`text-xl font-bold hidden md:block`}>fastshop</span>
    </Link>
  );
}
