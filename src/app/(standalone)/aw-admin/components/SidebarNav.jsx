"use client";

import {
  LayoutDashboard,
  Briefcase,
  Users,
  Mail,
  Settings,
  LogOut,
  X,
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
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#090A0E] border-r border-white/[0.08] flex flex-col justify-between transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
      <div className="flex flex-col h-full overflow-hidden">
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
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
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight text-base font-heading">
                AWTOMATIG
              </span>
              <span className="text-[10px] font-mono font-medium tracking-wider text-white/50 uppercase px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]">
                Admin
              </span>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Section Groups */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {navSections.map((group) => (
            <div key={group.label} className="space-y-1.5">
              <p className="px-3 text-xs font-mono font-semibold uppercase tracking-wider text-white/40">
                {group.label}
              </p>
              <div className="space-y-1 pt-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectSection(item.id)}
                      className={`w-full flex items-center justify-between py-2.5 text-sm transition-colors rounded-lg cursor-pointer ${
                        isActive
                          ? "bg-white/[0.08] text-white font-medium border-l-2 border-[#33E6D8] pl-3 pr-3"
                          : "text-white/65 hover:text-white hover:bg-white/[0.04] pl-3.5 pr-3"
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? "text-[#33E6D8]" : "text-white/50"
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.count !== undefined && item.count !== null && (
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
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Footer Profile */}
        <div className="p-3.5 border-t border-white/[0.08] bg-[#07080A] shrink-0">
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
        </div>
      </div>
    </aside>
    </>
  );
}
