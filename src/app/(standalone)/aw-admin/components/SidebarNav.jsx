"use client";

import {
  LayoutDashboard,
  Briefcase,
  Users,
  Mail,
  Settings,
  LogOut,
  X,
  ChevronLeft,
} from "lucide-react";

export default function SidebarNav({
  activeSection,
  onSelectSection,
  mobileOpen,
  onCloseMobile,
  currentUser,
  onLogout,
  applicationsCount = 0,
  jobsCount = 0,
  inquiriesCount = 0,
  isCollapsed = false,
  onToggleCollapse,
}) {
  const navSections = [
    {
      label: "WORKSPACE",
      items: [
        {
          id: "overview",
          label: "Overview",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: "RECRUITMENT",
      items: [
        {
          id: "pipeline",
          label: "Candidate Applications",
          icon: Users,
          count: applicationsCount,
        },
        {
          id: "jobs",
          label: "Job Openings",
          icon: Briefcase,
          count: jobsCount,
        },
      ],
    },
    {
      label: "COMMUNICATIONS",
      items: [
        {
          id: "inquiries",
          label: "Inquiries",
          icon: Mail,
          count: inquiriesCount,
          highlightCount: inquiriesCount > 0,
        },
      ],
    },
    {
      label: "PREFERENCES",
      items: [
        {
          id: "settings",
          label: "Account Settings",
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs md:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-[#090A0E] border-r border-white/[0.08] flex flex-col justify-between transition-all duration-300 ease-in-out md:static md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-64 md:w-[74px]" : "w-64"}`}
      >
        <div className="flex flex-col h-full overflow-x-hidden overflow-y-auto">
          {/* Brand Header */}
          <div
            className={`h-16 border-b border-white/[0.08] flex items-center shrink-0 transition-all duration-300 ${
              isCollapsed ? "px-3 justify-center" : "px-5 justify-between"
            }`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              {currentUser?.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt="AWTOMATIG Admin"
                  className="w-8 h-8 rounded-lg object-cover border border-white/10 shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#33E6D8] font-mono text-sm font-bold shrink-0">
                  A
                </div>
              )}

              {!isCollapsed && (
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="font-bold text-white tracking-tight text-base font-heading whitespace-nowrap">
                    AWTOMATIG
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Collapse Toggle in Brand Header */}
            {!isCollapsed && (
              <button
                onClick={onToggleCollapse}
                className="hidden md:flex p-1.5 rounded-lg text-white/40 hover:text-[#33E6D8] hover:bg-white/[0.06] transition-colors cursor-pointer"
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Section Groups */}
          <nav
            className={`flex-1 py-4 space-y-5 transition-all duration-300 ${
              isCollapsed ? "px-2.5" : "px-3.5"
            }`}
          >
            {navSections.map((group, groupIdx) => (
              <div key={group.label} className="space-y-1">
                {!isCollapsed ? (
                  <p className="px-3 text-xs font-mono font-semibold uppercase tracking-wider text-white/40 mb-1.5">
                    {group.label}
                  </p>
                ) : (
                  groupIdx > 0 && (
                    <div className="my-2.5 mx-auto w-6 h-[1px] bg-white/[0.08]" />
                  )
                )}

                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <div key={item.id} className="relative group">
                        <button
                          onClick={() => onSelectSection(item.id)}
                          className={`w-full flex items-center transition-all duration-200 rounded-xl cursor-pointer ${
                            isCollapsed
                              ? `h-11 justify-center p-0 ${
                                  isActive
                                    ? "bg-[#33E6D8]/15 text-[#33E6D8] border border-[#33E6D8]/30 shadow-[0_0_15px_rgba(51,230,216,0.15)]"
                                    : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                                }`
                              : `justify-between py-2.5 text-sm pl-3.5 pr-3 ${
                                  isActive
                                    ? "bg-white/[0.08] text-white font-medium border-l-2 border-[#33E6D8]"
                                    : "text-white/65 hover:text-white hover:bg-white/[0.04]"
                                }`
                          }`}
                          title={isCollapsed ? item.label : undefined}
                        >
                          <div
                            className={`flex items-center gap-3 truncate ${
                              isCollapsed ? "justify-center" : ""
                            }`}
                          >
                            <Icon
                              className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                                isCollapsed ? "w-5 h-5" : "w-4 h-4"
                              } ${
                                isActive
                                  ? "text-[#33E6D8]"
                                  : "text-white/50 group-hover:text-white"
                              }`}
                            />
                            {!isCollapsed && (
                              <span className="truncate">{item.label}</span>
                            )}
                          </div>

                          {!isCollapsed &&
                            item.count !== undefined &&
                            item.count !== null && (
                              <span
                                className={`text-xs font-mono px-2 py-0.5 rounded-md ${
                                  item.highlightCount
                                    ? "bg-[#33E6D8]/15 text-[#33E6D8] font-semibold"
                                    : "bg-white/[0.05] text-white/50 font-normal"
                                }`}
                              >
                                {item.count}
                              </span>
                            )}

                          {/* Collapsed dot badge for counts */}
                          {isCollapsed && item.count > 0 && (
                            <span
                              className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                                item.highlightCount
                                  ? "bg-[#33E6D8] shadow-[0_0_6px_#33E6D8]"
                                  : "bg-white/40"
                              }`}
                            />
                          )}
                        </button>

                        {/* Floating Tooltip on Hover in Collapsed Mode */}
                        {isCollapsed && (
                          <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-[#0e1017] border border-white/10 rounded-lg text-xs font-semibold text-white shadow-2xl whitespace-nowrap z-[9999] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 flex items-center gap-2">
                            <span>{item.label}</span>
                            {item.count !== undefined && item.count !== null && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#33E6D8]/15 text-[#33E6D8] font-bold">
                                {item.count}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* User Footer Profile */}
          <div
            className={`border-t border-white/[0.08] bg-[#07080A] shrink-0 transition-all duration-300 ${
              isCollapsed ? "p-2.5 flex flex-col items-center gap-2" : "p-3.5"
            }`}
          >
            {!isCollapsed ? (
              <div className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-md">
                <div className="flex items-center gap-3 overflow-hidden">
                  {currentUser?.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.fullName || "Admin"}
                      className="w-8 h-8 rounded-lg object-cover border border-white/10 shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-medium text-white/80 shrink-0 font-mono">
                      {(currentUser?.fullName || "A")[0]?.toUpperCase()}
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-white truncate">
                      {currentUser?.fullName || "Administrator"}
                    </p>
                    <p className="text-xs text-white/45 font-mono truncate">
                      {currentUser?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="p-1.5 hover:bg-rose-500/10 hover:text-rose-400 rounded-md text-white/40 transition-colors cursor-pointer shrink-0"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="relative group flex flex-col items-center gap-2 py-1">
                <div
                  className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-bold text-white/80 shrink-0 font-mono cursor-default overflow-hidden"
                  title={currentUser?.fullName || "Administrator"}
                >
                  {currentUser?.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.fullName || "Admin"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    (currentUser?.fullName || "A")[0]?.toUpperCase()
                  )}
                </div>

                <button
                  onClick={onLogout}
                  className="p-1.5 hover:bg-rose-500/10 hover:text-rose-400 rounded-lg text-white/40 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>

                {/* Tooltip on hover in collapsed mode */}
                <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-[#0e1017] border border-white/10 rounded-lg text-xs font-medium text-white shadow-2xl whitespace-nowrap z-[9999] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150">
                  <p className="font-semibold text-white">
                    {currentUser?.fullName || "Administrator"}
                  </p>
                  <p className="text-[10px] text-white/40 font-mono">
                    {currentUser?.email}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
