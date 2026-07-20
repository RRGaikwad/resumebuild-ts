import { Link, useLocation } from "react-router-dom";
import { FiHome, FiLayout, FiUser } from "react-icons/fi";
import clsx from "clsx";

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: FiHome },
    { path: "/templates", label: "Templates", icon: FiLayout },
    { path: "/form", label: "Profile", icon: FiUser },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <ul className="flex items-center justify-around h-16">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <li key={path} className="flex-1 flex justify-center">
              <Link
                to={path}
                className={clsx(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300",
                  isActive
                    ? "text-blue-600 dark:text-blue-400 scale-110"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                <Icon className={clsx("text-xl mb-0.5", isActive ? "stroke-[2.5px]" : "")} />
                <span className="text-[10px] font-semibold tracking-wide">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
