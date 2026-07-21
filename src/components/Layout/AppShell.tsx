import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLayout, FiUser, FiBriefcase, FiBookOpen, FiAward, FiMessageSquare, FiCommand, FiCheckSquare, FiSearch, FiBell, FiGift, FiLogOut, FiDownload } from "react-icons/fi";
import { BottomNav } from "./BottomNav";
import { useAuth } from "../../lib/AuthContext";
import { AccountModal } from "../AccountModal";
import clsx from "clsx";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!installPromptEvent) return;
    installPromptEvent.prompt();
    const { outcome } = await installPromptEvent.userChoice;
    if (outcome === "accepted") {
      setInstallPromptEvent(null);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  const userInitial = user?.displayName?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "U";
  const userName = user?.displayName ?? user?.email?.split("@")[0] ?? "User";

  const buildLinks = [
    { path: "/templates", label: "Templates", icon: FiLayout },
    { path: "/form", label: "Resume Editor", icon: FiUser },
  ];

  const toolLinks = [
    { path: "#", label: "AI Assistant", icon: FiCommand, badge: "NEW" },
    { path: "#", label: "Cover Letter", icon: FiMessageSquare },
    { path: "#", label: "Resume Checker", icon: FiCheckSquare },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Dark Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-[260px] bg-[#0F172A] z-20 shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-bold">R</div>
          <span className="text-xl font-bold text-white tracking-tight">ResumeBuilder</span>
        </div>
        
        <div className="px-4 mb-2">
          <Link to="/" className={clsx("flex items-center gap-3 px-4 py-3 rounded-[16px] transition-all duration-200", location.pathname === "/" ? "bg-[#2563EB] text-white" : "text-white hover:bg-white/10")}>
            <FiLayout className={clsx("text-lg", location.pathname === "/" ? "text-white" : "text-[#6B7280]")} />
            <span className="font-semibold text-[15px]">Dashboard</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-[1px] mb-3 px-4 mt-6">Build Resume</div>
          <nav className="space-y-1">
            {buildLinks.map(({ path, label, icon: Icon }) => (
              <Link key={label} to={path} className={clsx("flex items-center gap-3 px-4 py-2.5 rounded-[16px] transition-all duration-200", location.pathname === path ? "bg-[#2563EB] text-white" : "text-white hover:bg-white/10")}>
                <Icon className={clsx("text-lg", location.pathname === path ? "text-white" : "text-[#6B7280]")} />
                <span className="font-medium text-[15px]">{label}</span>
              </Link>
            ))}
          </nav>

          <div className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-[1px] mb-3 px-4 mt-8">Tools</div>
          <nav className="space-y-1">
            {toolLinks.map(({ path, label, icon: Icon, badge }) => (
              <Link key={label} to={path} className="flex items-center justify-between px-4 py-2.5 rounded-[16px] transition-all duration-200 text-white hover:bg-white/10 group">
                <div className="flex items-center gap-3">
                  <Icon className="text-lg text-[#6B7280] group-hover:text-white transition-colors" />
                  <span className="font-medium text-[15px]">{label}</span>
                </div>
                {badge && <span className="text-[10px] bg-[#2563EB] text-white px-2 py-0.5 rounded-full font-bold">{badge}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 mt-auto">
          <div className="bg-white/5 rounded-[16px] p-4 mb-4">
            <div className="text-yellow-400 text-lg mb-1">👑</div>
            <h4 className="text-white font-bold text-[15px] mb-1">Upgrade to Pro</h4>
            <p className="text-[13px] text-[#9CA3AF] mb-4 leading-tight">Unlock premium templates, AI tools, and more.</p>
            <button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[15px] font-semibold py-2.5 rounded-[12px] transition-colors">Upgrade Now</button>
          </div>
          <div 
            onClick={() => setIsAccountModalOpen(true)}
            className="flex items-center gap-3 px-2 py-2 rounded-[16px] group cursor-pointer hover:bg-white/5 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#2563EB] flex-shrink-0 overflow-hidden flex items-center justify-center">
              {user?.photoURL
                ? <img src={user.photoURL} alt={userName} className="w-full h-full object-cover" />
                : <span className="text-white font-bold text-[15px]">{userInitial}</span>
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-medium text-white truncate">{userName}</p>
              <p className="text-[13px] text-[#9CA3AF] truncate">Free Plan</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleLogout(); }}
              title="Sign out"
              className="text-[#6B7280] hover:text-white transition-colors p-1.5 rounded-[8px] hover:bg-white/10"
            >
              <FiLogOut className="text-lg" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-[72px] bg-white border-b border-[#E5E7EB] flex items-center px-4 md:px-8 z-10 shrink-0">
          <div className="flex-1 flex justify-center hidden md:flex">
            <div className="relative w-full max-w-[750px] z-50">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] text-lg" />
              <input 
                type="text" 
                placeholder="Search templates, resumes, or tools..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-[16px] pl-12 pr-4 h-[44px] text-[15px] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all" 
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[#9CA3AF] text-xs font-medium">
                <span className="bg-white border border-[#E5E7EB] rounded px-1.5 py-0.5">⌘</span>
                <span className="bg-white border border-[#E5E7EB] rounded px-1.5 py-0.5">K</span>
              </div>

              {isSearchFocused && searchQuery && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsSearchFocused(false)} />
                  <div className="absolute top-full mt-2 w-full bg-white border border-[#E5E7EB] rounded-[16px] shadow-lg z-50 overflow-hidden">
                    <div className="p-2">
                      <p className="px-3 py-2 text-xs font-semibold text-[#9CA3AF] uppercase">Navigation</p>
                      <button onClick={() => { navigate("/templates"); setIsSearchFocused(false); setSearchQuery(""); }} className="w-full text-left px-3 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg">Browse Templates</button>
                      <button onClick={() => { navigate("/form"); setIsSearchFocused(false); setSearchQuery(""); }} className="w-full text-left px-3 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg">Resume Editor</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-5 ml-auto">
            {installPromptEvent && (
              <button 
                onClick={handleInstallClick}
                className="hidden md:flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#2563EB] text-[#2563EB] text-[13px] font-semibold px-3 py-1.5 rounded-[8px] transition-colors"
              >
                <FiDownload className="text-sm" />
                Install App
              </button>
            )}

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-[#6B7280] hover:text-[#111827] transition-colors relative"
              >
                <FiBell className="text-xl" />
                <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#EF4444] border-2 border-white rounded-full text-white text-[10px] font-bold flex items-center justify-center">1</span>
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 top-full mt-3 w-[320px] bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
                      <h3 className="font-bold text-[#111827]">Notifications</h3>
                      <button className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8]">Mark all read</button>
                    </div>
                    <div className="p-2 max-h-[300px] overflow-y-auto">
                      <div className="p-3 hover:bg-[#F8FAFC] rounded-[8px] transition-colors cursor-pointer flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0">
                          <span className="text-xl">👋</span>
                        </div>
                        <div>
                          <p className="text-[14px] font-medium text-[#111827]">Welcome to ResumeBuilder!</p>
                          <p className="text-[12px] text-[#6B7280] mt-0.5">Let's create your first resume.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div 
              onClick={() => setIsAccountModalOpen(true)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#E5E7EB] ml-2 bg-[#2563EB] flex items-center justify-center cursor-pointer hover:border-[#2563EB] transition-colors"
            >
              {user?.photoURL
                ? <img src={user.photoURL} alt={userName} className="w-full h-full object-cover" />
                : <span className="text-white font-bold text-[14px]">{userInitial}</span>
              }
            </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0 relative">
          <div className="w-full max-w-[1320px] mx-auto p-4 md:p-[32px] min-h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
      
      {/* Modals */}
      <AccountModal isOpen={isAccountModalOpen} onClose={() => setIsAccountModalOpen(false)} />
    </div>
  );
}


