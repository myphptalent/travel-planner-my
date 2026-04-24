import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Sidebar({ isOpen, setIsOpen, collapsed, setCollapsed }: any) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: "📊" },
    { name: "Search", path: "/search", icon: "🔍" },
    { name: "Saved Trips", path: "/saved-trips", icon: "💾" },
  ];

  // ✅ Auto close on route change (important)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <aside
      className={`fixed md:relative z-50 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out
      ${collapsed ? "w-20" : "w-64"}
      ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      {/* Logo Area */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100 dark:border-gray-800">
        {!collapsed && (
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Traveler
          </span>
        )}
        <button 
          onClick={() => {
            setCollapsed(!collapsed);
            if (window.innerWidth < 768) {
              setIsOpen(false);
            }
          }}
          className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}

            // ✅ CLOSE SIDEBAR ON CLICK (mobile)
            onClick={() => setIsOpen(false)}

            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
              ${isActive 
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900"
              }`
            }
          >
            <span className="text-lg transition-transform group-hover:scale-110">
              {item.icon}
            </span>
            {!collapsed && <span className="truncate">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}