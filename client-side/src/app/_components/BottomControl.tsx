import Nav from "./Header/Nav";

export function BottomControl() {
  return (
    <nav className="px-4 py-2 fixed bottom-0 left-0 w-full border-t bg-muted flex justify-between  lg:hidden">
      <Nav />
    </nav>
  );
}
