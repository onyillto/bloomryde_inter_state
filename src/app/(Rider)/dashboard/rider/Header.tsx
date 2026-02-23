import { Icons } from "./Icons";

type HeaderProps = {
  setIsSidebarOpen: (isOpen: boolean) => void;
};

export default function Header({ setIsSidebarOpen }: HeaderProps) {
  return (
    <div className="sticky top-0 z-10 px-4 md:px-8 py-5 bg-slate-950/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
        >
          <Icons.Menu />
        </button>
        <div>
          <h1 className="display-font text-xl md:text-2xl font-bold text-white">
            Good morning, Amara 👋
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-0.5">
            Where are you headed today?
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-slate-300">
          <Icons.Bell />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>
        <button className="book-btn flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-semibold text-white">
          <Icons.Plus />
          Book a Ride
        </button>
      </div>
    </div>
  );
}
