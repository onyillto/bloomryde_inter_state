import { Icons } from "./Icons";

const navItems = [
  { icon: "Home", label: "Dashboard", section: "MAIN" },
  { icon: "Search", label: "Find a Ride", section: "MAIN" },
  { icon: "Bookmark", label: "My Bookings", badge: 2, section: "MAIN" },
  { icon: "Clock", label: "Trip History", section: "MAIN" },
  { icon: "User", label: "My Profile", section: "ACCOUNT" },
  { icon: "Shield", label: "Emergency Contacts", section: "ACCOUNT" },
  { icon: "Settings", label: "Settings", section: "ACCOUNT" },
];

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
};

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  activeNav,
  setActiveNav,
}: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0 flex flex-col border-r border-white/5 bg-slate-900/95 backdrop-blur-xl md:bg-slate-900/80 md:backdrop-blur-none sidebar-scrollbar overflow-y-auto transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="p-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Icons.Bus />
          </div>
          <div>
            <p className="display-font font-bold text-white text-base leading-none">
              BloomRydes
            </p>
            <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mt-0.5">
              Interstate
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
        >
          <Icons.X />
        </button>
      </div>

      <div className="px-4 pb-4 flex-1">
        {["MAIN", "ACCOUNT"].map((section) => (
          <div key={section} className="mb-4">
            <p className="text-slate-500 text-[10px] font-semibold tracking-[0.15em] uppercase px-3 mb-2">
              {section}
            </p>
            {navItems
              .filter((item) => item.section === section)
              .map((item) => {
                const Icon = Icons[item.icon as keyof typeof Icons];
                const isActive = activeNav === item.label;
                return (
                  <button
                    key={item.label}
                    onClick={() => setActiveNav(item.label)}
                    className={`nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>
        ))}
      </div>

      {/* Bottom user card */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">
              Amara Okonkwo
            </p>
            <p className="text-slate-400 text-xs truncate">Passenger</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
