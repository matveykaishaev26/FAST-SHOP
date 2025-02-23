import Image from "next/image";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 min-h-screen lg:grid-cols-2">
      <div className="bg-primary hidden  select-none lg:flex items-center justify-center ">
        <Image src="/images/auth-logo.svg" alt="Logo" width={200} height={200} />
      </div>
      <div className="flex justify-center items-center">{children}</div>
    </section>
  );
}
