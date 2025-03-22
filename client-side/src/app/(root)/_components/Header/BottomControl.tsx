import Nav from "./Nav";

export function BottomControl() {
  return (
    <nav className={`z-50 px-4 py-2  w-full border-t bg-muted flex  justify-between   lg:hidden`}>
      <Nav />
    </nav>
  );
}
