"use client";

import { useCallback, useEffect, useState } from "react";

// ────────────────────────────────────────────────────────────────
// Field labels per position
// ────────────────────────────────────────────────────────────────
const FULLSTACK_FIELD_LABELS = {
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

const UIUX_FIELD_LABELS = {
  full_name: "Full Name",
  email: "Email",
  phone: "Phone / WhatsApp",
  linkedin_url: "LinkedIn",
  portfolio_url: "Portfolio URL",
  design_profile_url: "Behance / Dribbble / Figma",
  experience_level: "Design Experience",
  tools_used: "Tools Used",
  design_duration: "Designing For",
  portfolio_project_count: "Portfolio Projects",
  project_types: "Project Types",
  proud_project: "Proudest Project",
  project_role: "Role in Project",
  conversion_review_answer: "Conversion Review",
  rejected_design_answer: "Rejected Design Response",
  feedback_comfort: "Feedback Comfort",
  onsite_available: "On-site Available",
  three_month_commitment: "3-Month Commit",
  current_status: "Current Status",
  start_date: "Available Start Date",
  why_awtomatig: "Why AWTOMATIG",
  extra_note: "Extra Notes",
};

// ────────────────────────────────────────────────────────────────
// Value label maps
// ────────────────────────────────────────────────────────────────
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

const UIUX_EXPERIENCE_LABELS = {
  just_starting: "Just getting started",
  few_personal_projects: "Built a few personal projects",
  multiple_real_projects: "Designed multiple real projects",
  freelance_client: "Freelance or client experience",
};

const DESIGN_DURATION_LABELS = {
  lt_6m: "Less than 6 months",
  "6_12m": "6–12 months",
  "1_2y": "1–2 years",
  "2y_plus": "2+ years",
};

const PORTFOLIO_COUNT_LABELS = {
  "1_2": "1–2",
  "3_5": "3–5",
  "6_10": "6–10",
  "10_plus": "10+",
};

const UIUX_TOOL_LABELS = {
  figma: "Figma",
  adobe_xd: "Adobe XD",
  photoshop: "Photoshop",
  illustrator: "Illustrator",
  canva: "Canva",
  framer: "Framer",
  other: "Other",
};

const PROJECT_TYPE_LABELS = {
  websites: "Websites",
  dashboards: "Dashboards",
  mobile_apps: "Mobile Apps",
  landing_pages: "Landing Pages",
  ecommerce: "E-commerce",
  branding: "Branding",
  graphics_social: "Graphics / Social Media",
};

const CONVERSION_LABELS = {
  colors: "Colors",
  typography: "Typography",
  user_flow: "User Flow",
  images: "Images",
  not_sure: "Not sure",
};

const REJECTED_LABELS = {
  defend_design: "Defend my design",
  ask_feedback_iterate: "Ask for feedback and iterate",
  start_over: "Start over completely",
  wait_instructions: "Wait for instructions",
};

const FEEDBACK_COMFORT_LABELS = {
  not_comfortable: "Not comfortable",
  somewhat_comfortable: "Somewhat comfortable",
  comfortable: "Comfortable",
  very_comfortable: "Very comfortable",
};

const CURRENT_STATUS_LABELS = {
  fulltime_student: "Full-time student",
  final_year_student: "Final year student",
  recent_graduate: "Recent graduate",
  employed_fulltime: "Employed full-time",
  employed_parttime: "Employed part-time",
  freelancing: "Freelancing",
  other: "Other",
};

// ────────────────────────────────────────────────────────────────
// Format helpers
// ────────────────────────────────────────────────────────────────
function formatFullstackValue(key, value) {
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

function formatUiuxValue(key, value) {
  if (value === undefined || value === null || value === "") return "—";
  if (key === "experience_level") return UIUX_EXPERIENCE_LABELS[value] || value;
  if (key === "design_duration") return DESIGN_DURATION_LABELS[value] || value;
  if (key === "portfolio_project_count") return PORTFOLIO_COUNT_LABELS[value] || value;
  if (key === "tools_used" && Array.isArray(value)) {
    return value.map((s) => UIUX_TOOL_LABELS[s] || s).join(", ");
  }
  if (key === "project_types" && Array.isArray(value)) {
    return value.map((s) => PROJECT_TYPE_LABELS[s] || s).join(", ");
  }
  if (key === "conversion_review_answer") return CONVERSION_LABELS[value] || value;
  if (key === "rejected_design_answer") return REJECTED_LABELS[value] || value;
  if (key === "feedback_comfort") return FEEDBACK_COMFORT_LABELS[value] || value;
  if (key === "current_status") return CURRENT_STATUS_LABELS[value] || value;
  if (key === "onsite_available" || key === "three_month_commitment") {
    return value === "yes" ? "Yes" : "No";
  }
  return String(value);
}

// ────────────────────────────────────────────────────────────────
// Position config
// ────────────────────────────────────────────────────────────────
const POSITION_CONFIG = {
  fullstack_intern: {
    title: "Full Stack Intern Applications",
    subtitle: "Manage and review incoming full stack developer applications",
    fieldLabels: FULLSTACK_FIELD_LABELS,
    formatValue: formatFullstackValue,
    shortFields: [
      "full_name", "email", "phone", "location", "university", "department",
      "graduation_status", "graduation_year", "experience_level",
      "onsite_availability", "commit_3_months", "join_timeline",
      "nextjs_experience", "backend_rating", "database_rating", "project_name",
    ],
    linkFields: ["github_url", "portfolio_url", "linkedin_url", "deployed_project_url", "project_repo_url"],
    tagField: "skills",
    tagLabels: SKILL_LABELS,
    tagTitle: "Skills",
    longFields: [
      "project_description", "project_tech", "project_role",
      "project_hardest_problem", "project_improvement",
      "clean_code_definition", "ai_tool_usage", "stuck_bug_approach",
      "collaboration_experience", "why_awtomatig",
    ],
  },
  uiux_intern: {
    title: "UI/UX Design Intern Applications",
    subtitle: "Manage and review incoming UI/UX design intern applications",
    fieldLabels: UIUX_FIELD_LABELS,
    formatValue: formatUiuxValue,
    shortFields: [
      "full_name", "email", "phone",
      "experience_level", "design_duration", "portfolio_project_count",
      "onsite_available", "three_month_commitment", "current_status", "start_date",
      "conversion_review_answer", "rejected_design_answer", "feedback_comfort",
    ],
    linkFields: ["portfolio_url", "linkedin_url", "design_profile_url"],
    tagField: "tools_used",
    tagLabels: UIUX_TOOL_LABELS,
    tagTitle: "Design Tools",
    secondTagField: "project_types",
    secondTagLabels: PROJECT_TYPE_LABELS,
    secondTagTitle: "Project Types",
    longFields: [
      "proud_project", "project_role", "why_awtomatig", "extra_note",
    ],
  },
};

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
// Position Selector
// ────────────────────────────────────────────────────────────────
function PositionSelector({ onSelect, onLogout }) {
  return (
    <div className="min-h-screen bg-[#050507]">
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

      <div className="max-w-[800px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Select Position</h1>
          <p className="text-white/50 text-sm">Choose which intern applications you want to review</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Stack Intern Card */}
          <button
            onClick={() => onSelect("fullstack_intern")}
            className="group bg-[#0B0C10] border border-white/10 rounded-2xl p-8 text-left transition-all duration-200 hover:border-[#33E6D8]/40 hover:shadow-[0_0_32px_-8px_rgba(51,230,216,0.25)]"
          >
            <div className="w-12 h-12 rounded-xl bg-[#33E6D8]/15 border border-[#33E6D8]/25 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-[#33E6D8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white mb-2 group-hover:text-[#33E6D8] transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Full Stack Intern</h2>
            <p className="text-white/45 text-sm leading-relaxed">Review full stack developer intern applications, GitHub profiles, and technical assessments</p>
            <div className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-wide text-[#33E6D8]/70 group-hover:text-[#33E6D8] transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              View Applications
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
          </button>

          {/* UI/UX Intern Card */}
          <button
            onClick={() => onSelect("uiux_intern")}
            className="group bg-[#0B0C10] border border-white/10 rounded-2xl p-8 text-left transition-all duration-200 hover:border-[#8C5DA0]/40 hover:shadow-[0_0_32px_-8px_rgba(140,93,160,0.25)]"
          >
            <div className="w-12 h-12 rounded-xl bg-[#8C5DA0]/15 border border-[#8C5DA0]/25 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-[#8C5DA0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white mb-2 group-hover:text-[#8C5DA0] transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>UI/UX Design Intern</h2>
            <p className="text-white/45 text-sm leading-relaxed">Review UI/UX design intern applications, portfolios, and design thinking responses</p>
            <div className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-wide text-[#8C5DA0]/70 group-hover:text-[#8C5DA0] transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              View Applications
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Candidate Card (generic, driven by position config)
// ────────────────────────────────────────────────────────────────
function CandidateCard({ application, config, position, onStatusChange, expanded, onToggle }) {
  const status = application.status;
  const isRejected = status === "rejected";
  const isApproved = status === "approved";

  const { fieldLabels, formatValue, shortFields, linkFields, tagField, tagLabels, tagTitle, secondTagField, secondTagLabels, secondTagTitle, longFields } = config;

  const borderClass = isRejected
    ? "border-[#E15A72]/20 opacity-60"
    : isApproved
      ? "border-[#4ADE80]/20"
      : "border-white/10 hover:border-white/20";

  const avatarClass = isRejected
    ? "bg-[#E15A72]/20 text-[#E15A72]"
    : isApproved
      ? "bg-[#4ADE80]/20 text-[#4ADE80]"
      : "bg-[#33E6D8]/20 text-[#33E6D8]";

  return (
    <div className={`bg-[#0B0C10] border rounded-2xl overflow-hidden transition-all duration-200 ${borderClass}`}>
      {/* Card Header */}
      <div className="px-6 py-4 flex items-center justify-between gap-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-4 min-w-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${avatarClass}`}>
            {application.full_name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-semibold text-sm truncate">{application.full_name || "Unnamed"}</h3>
            <p className="text-white/40 text-xs truncate">{application.email} &middot; {application.location || application.current_status ? (formatValue("current_status", application.current_status)) : "—"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {application.priority === "high_priority" && (
            <span className="text-[10px] uppercase tracking-wide bg-[#33E6D8]/15 text-[#33E6D8] px-2.5 py-1 rounded-full border border-[#33E6D8]/30" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>High Priority</span>
          )}
          {application.priority === "medium_priority" && (
            <span className="text-[10px] uppercase tracking-wide bg-[#F5A623]/15 text-[#F5A623] px-2.5 py-1 rounded-full border border-[#F5A623]/30" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Medium Priority</span>
          )}
          {application.priority === "low_priority" && (
            <span className="text-[10px] uppercase tracking-wide bg-white/10 text-white/50 px-2.5 py-1 rounded-full border border-white/15" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Low Priority</span>
          )}
          {isApproved && (
            <span className="text-[10px] uppercase tracking-wide bg-[#4ADE80]/15 text-[#4ADE80] px-2.5 py-1 rounded-full border border-[#4ADE80]/30" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Approved</span>
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
            <p className="text-[11px] uppercase tracking-wider text-white/40 mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Basic Info</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {shortFields.map((key) => (
                <div key={key} className="bg-[#050507] rounded-lg px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wide text-white/35 mb-0.5">{fieldLabels[key] || key}</p>
                  <p className="text-sm text-white/85 break-words">{formatValue(key, application[key])}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="px-6 pb-5">
            <p className="text-[11px] uppercase tracking-wider text-white/40 mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Links</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {linkFields.map((key) => (
                <div key={key} className="bg-[#050507] rounded-lg px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wide text-white/35 mb-0.5">{fieldLabels[key] || key}</p>
                  {application[key] ? (
                    <a href={application[key]} target="_blank" rel="noopener noreferrer" className="text-sm text-[#33E6D8] hover:underline break-all">{application[key]}</a>
                  ) : (
                    <p className="text-sm text-white/30">—</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tags (skills / tools) */}
          <div className="px-6 pb-5">
            <p className="text-[11px] uppercase tracking-wider text-white/40 mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{tagTitle}</p>
            <div className="flex flex-wrap gap-2">
              {(application[tagField] || []).map((s) => (
                <span key={s} className="text-[11px] bg-[#33E6D8]/10 text-[#33E6D8] border border-[#33E6D8]/20 px-2.5 py-1 rounded-full">{tagLabels[s] || s}</span>
              ))}
              {(!application[tagField] || application[tagField].length === 0) && <span className="text-sm text-white/30">—</span>}
            </div>
          </div>

          {/* Second tag group (project types for UI/UX) */}
          {secondTagField && (
            <div className="px-6 pb-5">
              <p className="text-[11px] uppercase tracking-wider text-white/40 mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{secondTagTitle}</p>
              <div className="flex flex-wrap gap-2">
                {(application[secondTagField] || []).map((s) => (
                  <span key={s} className="text-[11px] bg-[#8C5DA0]/10 text-[#8C5DA0] border border-[#8C5DA0]/20 px-2.5 py-1 rounded-full">{secondTagLabels[s] || s}</span>
                ))}
                {(!application[secondTagField] || application[secondTagField].length === 0) && <span className="text-sm text-white/30">—</span>}
              </div>
            </div>
          )}

          {/* Long-form Answers */}
          <div className="px-6 pb-5">
            <p className="text-[11px] uppercase tracking-wider text-white/40 mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Detailed Answers</p>
            <div className="space-y-3">
              {longFields.map((key) => (
                <div key={key} className="bg-[#050507] rounded-lg px-4 py-3">
                  <p className="text-[10px] uppercase tracking-wide text-white/35 mb-1.5">{fieldLabels[key] || key}</p>
                  <p className="text-sm text-white/80 whitespace-pre-wrap leading-relaxed">{formatValue(key, application[key])}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-[#050507]/50 border-t border-white/5 flex items-center gap-3">
            {status !== "approved" && (
              <button
                onClick={(e) => { e.stopPropagation(); onStatusChange(application._id, "approved"); }}
                className="text-[12px] font-semibold uppercase tracking-wide text-[#4ADE80] border border-[#4ADE80]/30 bg-[#4ADE80]/10 px-5 py-2.5 rounded-full hover:bg-[#4ADE80]/20 transition-colors"
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
              >
                Approve
              </button>
            )}
            {status !== "active" && (
              <button
                onClick={(e) => { e.stopPropagation(); onStatusChange(application._id, "active"); }}
                className="text-[12px] font-semibold uppercase tracking-wide text-[#33E6D8] border border-[#33E6D8]/30 bg-[#33E6D8]/10 px-5 py-2.5 rounded-full hover:bg-[#33E6D8]/20 transition-colors"
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
              >
                Restore to Active
              </button>
            )}
            {status !== "rejected" && (
              <button
                onClick={(e) => { e.stopPropagation(); onStatusChange(application._id, "rejected"); }}
                className="text-[12px] font-semibold uppercase tracking-wide text-[#E15A72] border border-[#E15A72]/30 bg-[#E15A72]/10 px-5 py-2.5 rounded-full hover:bg-[#E15A72]/20 transition-colors"
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
              >
                Reject
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Priority Section
// ────────────────────────────────────────────────────────────────
function PrioritySection({ title, color, borderColor, applications, config, position, expandedId, setExpandedId, onStatusChange }) {
  const [collapsed, setCollapsed] = useState(false);

  if (applications.length === 0) return null;

  return (
    <div className="mb-8">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-3 mb-3 group"
      >
        <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>
        <span className="text-[12px] uppercase tracking-wider text-white/60" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          {title} ({applications.length})
        </span>
        <svg className={`w-3.5 h-3.5 text-white/30 transition-transform duration-200 ${collapsed ? "-rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {!collapsed && (
        <div className={`space-y-3 border-l-2 ${borderColor} pl-4`}>
          {applications.map((app) => (
            <CandidateCard
              key={app._id}
              application={app}
              config={config}
              position={position}
              expanded={expandedId === app._id}
              onToggle={() => setExpandedId(expandedId === app._id ? null : app._id)}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Admin Dashboard (generic, driven by position)
// ────────────────────────────────────────────────────────────────
function AdminDashboard({ token, position, onBack, onLogout }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("active");
  const [expandedId, setExpandedId] = useState(null);

  const config = POSITION_CONFIG[position];

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/applications?status=${filter}&position=${position}`, {
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
  }, [token, filter, position, onLogout]);

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
        body: JSON.stringify({ status, position }),
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
  const approvedCount = applications.filter((a) => a.status === "approved").length;
  const rejectedCount = applications.filter((a) => a.status === "rejected").length;

  const highPriority = applications.filter((a) => a.priority === "high_priority");
  const mediumPriority = applications.filter((a) => a.priority === "medium_priority");
  const lowPriority = applications.filter((a) => !a.priority || a.priority === "low_priority");

  return (
    <div className="min-h-screen bg-[#050507]">
      {/* Top Nav */}
      <nav className="sticky top-0 z-40 bg-[#050507]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-white/50 hover:text-white/80 transition-colors mr-3"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Positions
            </button>
            <span className="text-white/15">|</span>
            <span className="inline-block w-5 h-5 rounded-[5px] bg-gradient-to-br from-[#33E6D8] to-white rotate-45 ml-3"></span>
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{config.title}</h1>
          <p className="text-white/50 text-sm">{config.subtitle}</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {[
            ["active", "Active", activeCount],
            ["approved", "Approved", approvedCount],
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
          <div>
            <PrioritySection
              title="High Priority"
              color="bg-[#33E6D8]"
              borderColor="border-[#33E6D8]/30"
              applications={highPriority}
              config={config}
              position={position}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
              onStatusChange={updateStatus}
            />
            <PrioritySection
              title="Medium Priority"
              color="bg-[#F5A623]"
              borderColor="border-[#F5A623]/30"
              applications={mediumPriority}
              config={config}
              position={position}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
              onStatusChange={updateStatus}
            />
            <PrioritySection
              title="Low Priority"
              color="bg-white/40"
              borderColor="border-white/10"
              applications={lowPriority}
              config={config}
              position={position}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
              onStatusChange={updateStatus}
            />
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
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("aw_admin_token");
    if (saved) setToken(saved);
    setReady(true);
  }, []);

  function handleLogout() {
    localStorage.removeItem("aw_admin_token");
    setToken(null);
    setSelectedPosition(null);
  }

  if (!ready) {
    return <div className="min-h-screen bg-[#050507]" />;
  }

  const wrapper = (children) => (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');`}</style>
      <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', color: 'white' }}>
        {children}
      </div>
    </>
  );

  if (!token) {
    return wrapper(<LoginScreen onLogin={setToken} />);
  }

  if (!selectedPosition) {
    return wrapper(<PositionSelector onSelect={setSelectedPosition} onLogout={handleLogout} />);
  }

  return wrapper(
    <AdminDashboard
      token={token}
      position={selectedPosition}
      onBack={() => setSelectedPosition(null)}
      onLogout={handleLogout}
    />
  );
}
