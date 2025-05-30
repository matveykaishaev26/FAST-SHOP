import { BottomControl } from "./_components/Header/BottomControl";
import MainHeader from "./_components/Header/MainHeader";
import Footer from "./_components/Footer";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative  grid grid-rows-[auto_1fr_auto] min-h-screen">

      <div className="sticky z-30 top-0">
        <MainHeader />
      </div>
      <div className="max-w-page w-full h-full m-auto top-80 px-4 py-8 page:px-0">{children}</div>
      <div className="z-50 sticky bottom-0">
        <BottomControl />
      </div>
      <Footer />
    </section>
  );
}
