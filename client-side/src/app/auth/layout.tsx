import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-screen flex">
      {/* Левая панель с логотипом (только на больших экранах) */}
      <div className="bg-primary hidden select-none lg:flex items-center justify-center w-1/2">
        <Image src="/images/auth-logo.svg" alt="Logo" width={200} height={200} />
      </div>
      {/* Основной контент (форма авторизации) */}
      <div className="flex flex-1 justify-center items-center">
        {children}
      </div>
    </section>
  );
}
