import { BottomControl } from "./_components/Header/BottomControl";
import MainHeader from "./_components/Header/MainHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid  grid-rows-[auto_1fr_auto] min-h-screen">
      <div className="sticky z-50 top-0">
        <MainHeader />
      </div>
      <div className="max-w-page w-full h-full m-auto top-80 px-4 py-8 page:px-0">{children}</div>
      <div className="sticky bottom-0">
        <BottomControl />
      </div>
    </section>
  );
}
