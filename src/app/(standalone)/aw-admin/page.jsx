"use client";

import { useCallback, useEffect, useState } from "react";

const FIELD_LABELS = {
  full_name: "Full Name",
  email: "Email",
  phone: "Phone / WhatsApp",
  location: "Location",
  university: "University",
  department: "Department",
  graduation_status: "Graduation Status",
  graduation_year: "Graduation Year",
  experience_level: "Experience",
  onsite_availability: "On-site Available",
  commit_3_months: "3-Month Commit",
  join_timeline: "Can Join",
  github_url: "GitHub",
  portfolio_url: "Portfolio",
  linkedin_url: "LinkedIn",
  deployed_project_url: "Deployed Project",
  project_repo_url: "Project Repo",
  nextjs_experience: "Next.js Experience",
  skills: "Skills",
  backend_rating: "Backend Rating",
  database_rating: "Database Rating",
  project_name: "Project Name",
  project_description: "Project Description",
  project_tech: "Technologies Used",
  project_role: "Role in Project",
  project_hardest_problem: "Hardest Problem",
  project_improvement: "Would Improve",
  clean_code_definition: "Clean Code",
  ai_tool_usage: "AI Tool Usage",
  stuck_bug_approach: "Stuck on Bug",
  collaboration_experience: "Collaboration",
  why_awtomatig: "Why AWTOMATIG",
};

const GRADUATION_STATUS_LABELS = {
  final_year: "Final-year student",
  fresh_graduate: "Fresh graduate",
  graduated_within_1yr: "Graduated within 1 year",
  graduated_over_1yr: "Graduated 1+ year ago",
};

const EXPERIENCE_LABELS = {
  none: "No professional experience",
  lt_6m: "Less than 6 months",
  "6m_1y": "6 months to 1 year",
  gt_1y: "More than 1 year",
};

const NEXTJS_LABELS = {
  lt_1m: "Less than 1 month",
  "1_3m": "1–3 months",
  "3_6m": "3–6 months",
  "6_12m": "6–12 months",
  "1y_plus": "1 year+",
};

const JOIN_LABELS = {
  immediately: "Immediately",
  within_7_days: "Within 7 days",
  within_15_days: "Within 15 days",
  later_than_15_days: "Later than 15 days",
};

const SKILL_LABELS = {
  app_router: "Next.js App Router",
  react_components: "React Components",
  tailwind: "Tailwind CSS",
  api_routes: "API Routes",
  server_actions: "Server Actions",
  authentication: "Authentication",
  rest_apis: "REST APIs",
  database_integration: "Database Integration",
  mysql: "MySQL",
  postgresql: "PostgreSQL",
  mongodb: "MongoDB",
  firebase: "Firebase",
  supabase: "Supabase",
  git_github: "Git/GitHub",
  vercel: "Vercel Deployment",
  ai_tools: "AI Tools",
};

function formatValue(key, value) {
  if (value === undefined || value === null || value === "") return "—";
  if (key === "graduation_status") return GRADUATION_STATUS_LABELS[value] || value;
  if (key === "experience_level") return EXPERIENCE_LABELS[value] || value;
  if (key === "nextjs_experience") return NEXTJS_LABELS[value] || value;
  if (key === "join_timeline") return JOIN_LABELS[value] || value;
  if (key === "skills" && Array.isArray(value)) {
    return value.map((s) => SKILL_LABELS[s] || s).join(", ");
  }
  if (key === "onsite_availability" || key === "commit_3_months") {
    return value === "yes" ? "Yes" : "No";
  }
  if (key === "backend_rating" || key === "database_rating") {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return String(value);
}

function isUrl(key) {
  return ["github_url", "portfolio_url", "linkedin_url", "deployed_project_url", "project_repo_url"].includes(key);
}

// ────────────────────────────────────────────────────────────────
// Login Screen
// ────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem("aw_admin_token", data.token);
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <span className="inline-block w-6 h-6 rounded-[6px] bg-gradient-to-br from-[#33E6D8] to-white rotate-45"></span>
            <span className="font-bold text-white tracking-[0.04em] text-lg" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>AWTOMATIG</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Admin Panel</h1>
          <p className="text-white/50 text-sm">Sign in to manage intern applications</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0B0C10] border border-white/10 rounded-2xl p-8">
          <div className="mb-5">
            <label className="block text-[11px] uppercase tracking-wide text-white/50 mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-sm text-white bg-[#050507] border border-white/10 rounded-lg px-3.5 py-3 placeholder-white/30 focus:outline-none focus:border-[#33E6D8] focus:shadow-[0_0_0_3px_rgba(51,230,216,0.16)]"
              placeholder="admin@awtomatig.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-[11px] uppercase tracking-wide text-white/50 mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-sm text-white bg-[#050507] border border-white/10 rounded-lg px-3.5 py-3 placeholder-white/30 focus:outline-none focus:border-[#33E6D8] focus:shadow-[0_0_0_3px_rgba(51,230,216,0.16)]"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-[12.5px] text-[#E15A72]/90 bg-[#E15A72]/10 border-l-[3px] border-[#E15A72] px-3.5 py-2.5 mb-4 rounded-md">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-[13px] font-semibold uppercase tracking-wide text-[#050507] bg-[#33E6D8] py-3.5 rounded-full shadow-[0_0_24px_-4px_rgba(51,230,216,0.55)] hover:shadow-[0_0_32px_-2px_rgba(51,230,216,0.85)] transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Candidate Card
// ────────────────────────────────────────────────────────────────
function CandidateCard({ application, onReject, onRestore, expanded, onToggle }) {
  const isRejected = application.status === "rejected";

  const displayFields = Object.keys(FIELD_LABELS);

  const linkFields = ["github_url", "portfolio_url", "linkedin_url", "deployed_project_url", "project_repo_url"];
  const shortFields = [
    "full_name", "email", "phone", "location", "university", "department",
    "graduation_status", "graduation_year", "experience_level",
    "onsite_availability", "commit_3_months", "join_timeline",
    "nextjs_experience", "backend_rating", "database_rating", "project_name",
  ];
  const longFields = [
    "project_description", "project_tech", "project_role",
    "project_hardest_problem", "project_improvement",
    "clean_code_definition", "ai_tool_usage", "stuck_bug_approach",
    "collaboration_experience", "why_awtomatig",
  ];

  return (
    <div className={`bg-[#0B0C10] border rounded-2xl overflow-hidden transition-all duration-200 ${isRejected ? "border-[#E15A72]/20 opacity-60" : "border-white/10 hover:border-white/20"}`}>
      {/* Card Header */}
      <div className="px-6 py-4 flex items-center justify-between gap-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-4 min-w-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${isRejected ? "bg-[#E15A72]/20 text-[#E15A72]" : "bg-[#33E6D8]/20 text-[#33E6D8]"}`}>
            {application.full_name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-semibold text-sm truncate">{application.full_name || "Unnamed"}</h3>
            <p className="text-white/40 text-xs truncate">{application.email} &middot; {application.location || "—"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {application.priority === "high_priority" && (
            <span className="text-[10px] uppercase tracking-wide bg-[#33E6D8]/15 text-[#33E6D8] px-2.5 py-1 rounded-full border border-[#33E6D8]/30" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>High Priority</span>
          )}
          {isRejected && (
            <span className="text-[10px] uppercase tracking-wide bg-[#E15A72]/15 text-[#E15A72] px-2.5 py-1 rounded-full border border-[#E15A72]/30" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Rejected</span>
          )}
          <span className="text-white/30 text-xs">{new Date(application.submitted_at || application.created_at).toLocaleDateString()}</span>
          <svg className={`w-4 h-4 text-white/30 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-white/10">
          {/* Quick Info Grid */}
          <div className="px-6 py-5">
            <p className="text-[11px] uppercase tracking-wider text-white/40 mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Basic Info &amp; Links</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {shortFields.map((key) => (
                <div key={key} className="bg-[#050507] rounded-lg px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wide text-white/35 mb-0.5">{FIELD_LABELS[key]}</p>
                  <p className="text-sm text-white/85 break-words">{formatValue(key, application[key])}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="px-6 pb-5">
            <p className="text-[11px] uppercase tracking-wider text-white/40 mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Developer Links</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {linkFields.map((key) => (
                <div key={key} className="bg-[#050507] rounded-lg px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wide text-white/35 mb-0.5">{FIELD_LABELS[key]}</p>
                  {application[key] ? (
                    <a href={application[key]} target="_blank" rel="noopener noreferrer" className="text-sm text-[#33E6D8] hover:underline break-all">{application[key]}</a>
                  ) : (
                    <p className="text-sm text-white/30">—</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="px-6 pb-5">
            <p className="text-[11px] uppercase tracking-wider text-white/40 mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Skills</p>
            <div className="flex flex-wrap gap-2">
              {(application.skills || []).map((s) => (
                <span key={s} className="text-[11px] bg-[#33E6D8]/10 text-[#33E6D8] border border-[#33E6D8]/20 px-2.5 py-1 rounded-full">{SKILL_LABELS[s] || s}</span>
              ))}
              {(!application.skills || application.skills.length === 0) && <span className="text-sm text-white/30">—</span>}
            </div>
          </div>

          {/* Long-form Answers */}
          <div className="px-6 pb-5">
            <p className="text-[11px] uppercase tracking-wider text-white/40 mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Detailed Answers</p>
            <div className="space-y-3">
              {longFields.map((key) => (
                <div key={key} className="bg-[#050507] rounded-lg px-4 py-3">
                  <p className="text-[10px] uppercase tracking-wide text-white/35 mb-1.5">{FIELD_LABELS[key]}</p>
                  <p className="text-sm text-white/80 whitespace-pre-wrap leading-relaxed">{formatValue(key, application[key])}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-[#050507]/50 border-t border-white/5 flex items-center gap-3">
            {isRejected ? (
              <button
                onClick={(e) => { e.stopPropagation(); onRestore(application._id); }}
                className="text-[12px] font-semibold uppercase tracking-wide text-[#33E6D8] border border-[#33E6D8]/30 bg-[#33E6D8]/10 px-5 py-2.5 rounded-full hover:bg-[#33E6D8]/20 transition-colors"
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
              >
                Restore Candidate
              </button>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); onReject(application._id); }}
                className="text-[12px] font-semibold uppercase tracking-wide text-[#E15A72] border border-[#E15A72]/30 bg-[#E15A72]/10 px-5 py-2.5 rounded-full hover:bg-[#E15A72]/20 transition-colors"
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
              >
                Reject Candidate
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Admin Dashboard
// ────────────────────────────────────────────────────────────────
function AdminDashboard({ token, onLogout }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("active");
  const [expandedId, setExpandedId] = useState(null);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/applications?status=${filter}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        if (res.status === 401) { onLogout(); return; }
        throw new Error(data.message || "Failed to load applications.");
      }

      setApplications(data.applications);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, filter, onLogout]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  async function updateStatus(id, status) {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        if (res.status === 401) { onLogout(); return; }
        throw new Error(data.message);
      }
      fetchApplications();
    } catch (err) {
      alert(err.message || "Failed to update.");
    }
  }

  const activeCount = applications.filter((a) => a.status === "active").length;
  const rejectedCount = applications.filter((a) => a.status === "rejected").length;

  return (
    <div className="min-h-screen bg-[#050507]">
      {/* Top Nav */}
      <nav className="sticky top-0 z-40 bg-[#050507]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-5 h-5 rounded-[5px] bg-gradient-to-br from-[#33E6D8] to-white rotate-45"></span>
            <span className="font-bold text-white tracking-[0.04em] text-sm" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>AWTOMATIG</span>
            <span className="text-white/30 mx-2">|</span>
            <span className="text-[11px] uppercase tracking-wide text-white/50" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Admin Panel</span>
          </div>
          <button
            onClick={onLogout}
            className="text-[11px] uppercase tracking-wide text-white/50 hover:text-white/80 transition-colors"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Header + Stats */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Full Stack Intern Applications</h1>
          <p className="text-white/50 text-sm">Manage and review incoming applications</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {[
            ["active", "Active", activeCount],
            ["rejected", "Rejected", rejectedCount],
            ["all", "All", applications.length],
          ].map(([value, label, count]) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`text-[12px] uppercase tracking-wide px-4 py-2 rounded-full border transition-colors ${
                filter === value
                  ? "bg-[#33E6D8]/15 text-[#33E6D8] border-[#33E6D8]/30"
                  : "bg-transparent text-white/50 border-white/10 hover:border-white/20"
              }`}
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              {label} {filter === value ? `(${count})` : ""}
            </button>
          ))}

          <button
            onClick={fetchApplications}
            className="ml-auto text-[11px] uppercase tracking-wide text-white/40 hover:text-white/70 transition-colors"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Refresh
          </button>
        </div>

        {/* Content */}
        {loading && (
          <div className="text-center py-20">
            <p className="text-white/40 text-sm">Loading applications...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-[#E15A72] text-sm mb-3">{error}</p>
            <button onClick={fetchApplications} className="text-[12px] text-[#33E6D8] underline">Retry</button>
          </div>
        )}

        {!loading && !error && applications.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-sm">No applications found for this filter.</p>
          </div>
        )}

        {!loading && !error && applications.length > 0 && (
          <div className="space-y-3">
            {applications.map((app) => (
              <CandidateCard
                key={app._id}
                application={app}
                expanded={expandedId === app._id}
                onToggle={() => setExpandedId(expandedId === app._id ? null : app._id)}
                onReject={(id) => updateStatus(id, "rejected")}
                onRestore={(id) => updateStatus(id, "active")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Main Page
// ────────────────────────────────────────────────────────────────
export default function AwAdminPage() {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("aw_admin_token");
    if (saved) setToken(saved);
    setReady(true);
  }, []);

  function handleLogout() {
    localStorage.removeItem("aw_admin_token");
    setToken(null);
  }

  if (!ready) {
    return <div className="min-h-screen bg-[#050507]" />;
  }

  if (!token) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');`}</style>
        <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', color: 'white' }}>
          <LoginScreen onLogin={setToken} />
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');`}</style>
      <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', color: 'white' }}>
        <AdminDashboard token={token} onLogout={handleLogout} />
      </div>
    </>
  );
}
