import { Button } from "@/shared/components/ui/button";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-[1400px] m-auto space-y-4">
      <div className="flex justify-end">
        <Button className=" ">Добавить</Button>
      </div>
      {children}
    </section>
  );
}
