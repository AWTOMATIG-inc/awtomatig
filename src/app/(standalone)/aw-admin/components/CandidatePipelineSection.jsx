"use client";

import {
  Search,
  FileText,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

export default function CandidatePipelineSection({
  jobs = [],
  summary = {},
  stages = [],
  applications = [],
  selectedJob,
  onSelectJob,
  search,
  onSearchChange,
  priorityFilter,
  onPriorityFilterChange,
  stageFilter,
  onStageFilterChange,
  currentPage,
  totalPages,
  totalApplications,
  onPageChange,
  loading = false,
  onSelectCandidate,
  onUpdateCandidate,
}) {
  const getStageColor = (stageKey) => {
    switch (stageKey) {
      case "APPLIED":
        return "bg-white/40";
      case "SCREENING":
        return "bg-purple-400";
      case "INTERVIEW":
        return "bg-[#33E6D8]";
      case "OFFER":
        return "bg-amber-400";
      case "HIRED":
        return "bg-emerald-400";
      case "REJECTED":
        return "bg-rose-400";
      default:
        return "bg-white/40";
    }
  };

  return (
    <div className="flex-1 flex flex-col space-y-4 w-full">
      {/* Search & Filter Toolbar */}
      <div className="bg-[#090A0E] border border-white/[0.08] rounded-xl p-3.5 flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search candidates by name, email, or keywords..."
            className="w-full bg-[#050608] border border-white/[0.08] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#33E6D8] transition-colors"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Job Filter */}
          <select
            value={selectedJob}
            onChange={(e) => onSelectJob(e.target.value)}
            className="w-full sm:w-auto bg-[#050608] border border-white/[0.08] rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white/80 focus:outline-none focus:border-[#33E6D8] transition-colors cursor-pointer"
          >
            <option value="all">All Positions ({summary.all || 0})</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.slug}>
                {j.title} ({j._count?.applications || 0})
              </option>
            ))}
          </select>

          {/* Stage Filter */}
          <select
            value={stageFilter}
            onChange={(e) => onStageFilterChange(e.target.value)}
            className="flex-1 sm:flex-initial bg-[#050608] border border-white/[0.08] rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white/80 focus:outline-none focus:border-[#33E6D8] transition-colors cursor-pointer"
          >
            <option value="all">All Stages</option>
            {stages.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
            className="flex-1 sm:flex-initial bg-[#050608] border border-white/[0.08] rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white/80 focus:outline-none focus:border-[#33E6D8] transition-colors cursor-pointer"
          >
            <option value="all">All Priorities</option>
            <option value="HIGH_PRIORITY">High Priority</option>
            <option value="MEDIUM_PRIORITY">Medium Priority</option>
            <option value="LOW_PRIORITY">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Candidate Data Table */}
      <div className="bg-[#090A0E] border border-white/[0.08] rounded-xl overflow-hidden flex-1 flex flex-col justify-between">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02] text-xs uppercase font-mono text-white/50 tracking-wider">
                <th className="px-5 py-3.5 font-semibold">Candidate</th>
                <th className="px-5 py-3.5 font-semibold">Position</th>
                <th className="px-5 py-3.5 font-semibold">Stage</th>
                <th className="px-5 py-3.5 font-semibold">Score</th>
                <th className="px-5 py-3.5 font-semibold">Priority</th>
                <th className="px-5 py-3.5 font-semibold">Resume</th>
                <th className="px-5 py-3.5 font-semibold">Date</th>
                <th className="px-5 py-3.5 font-semibold text-right">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-sm">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                  {/* Candidate Name & Email */}
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-white tracking-tight text-sm">{app.fullName}</p>
                    <p className="text-xs text-white/45 font-mono truncate max-w-xs mt-0.5">
                      {app.email}
                    </p>
                  </td>

                  {/* Position */}
                  <td className="px-5 py-3.5 text-white/80 text-sm">
                    <span className="truncate block max-w-xs">
                      {app.job?.title || "—"}
                    </span>
                  </td>

                  {/* Stage Dropdown */}
                  <td className="px-5 py-3.5">
                    <select
                      value={app.stage}
                      onChange={(e) =>
                        onUpdateCandidate(app.id, { stage: e.target.value })
                      }
                      className="bg-[#050608] border border-white/[0.08] rounded-lg px-2.5 py-1 text-xs text-white/90 focus:outline-none focus:border-[#33E6D8] transition-colors cursor-pointer"
                    >
                      {stages.map((s) => (
                        <option key={s.key} value={s.key}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Score */}
                  <td className="px-5 py-3.5 font-mono text-xs text-white/80">
                    <span className="font-semibold text-[#33E6D8]">{app.score}</span>
                    <span className="text-white/35"> / 100</span>
                  </td>

                  {/* Priority Tag */}
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-xs font-mono font-semibold uppercase tracking-wider ${
                        app.priority === "HIGH_PRIORITY"
                          ? "text-[#33E6D8]"
                          : app.priority === "MEDIUM_PRIORITY"
                          ? "text-amber-400"
                          : "text-white/40"
                      }`}
                    >
                      {app.priority === "HIGH_PRIORITY"
                        ? "High"
                        : app.priority === "MEDIUM_PRIORITY"
                        ? "Medium"
                        : "Low"}
                    </span>
                  </td>

                  {/* Resume PDF */}
                  <td className="px-5 py-3.5">
                    {app.resumePath ? (
                      <a
                        href={`/api/admin/applications/${app.id}/resume`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-[#33E6D8] transition-colors font-medium"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span className="underline underline-offset-2">PDF</span>
                      </a>
                    ) : (
                      <span className="text-xs text-white/20">—</span>
                    )}
                  </td>

                  {/* Applied Date */}
                  <td className="px-5 py-3.5 text-xs text-white/50 font-mono whitespace-nowrap">
                    {new Date(app.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>

                  {/* Review Action */}
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => onSelectCandidate(app.id)}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-white/80 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors cursor-pointer"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}

              {applications.length === 0 && (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-white/40 font-mono text-sm">
                    No candidates found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalApplications > 0 && (
          <div className="px-5 py-3.5 border-t border-white/[0.06] bg-[#07080A] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
            <p className="text-white/50 font-mono text-xs">
              Showing{" "}
              <span className="text-white/90 font-medium">
                {(currentPage - 1) * 25 + 1}
              </span>{" "}
              to{" "}
              <span className="text-white/90 font-medium">
                {Math.min(currentPage * 25, totalApplications)}
              </span>{" "}
              of{" "}
              <span className="text-white/90 font-medium">{totalApplications}</span> candidates
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1 || loading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed text-white/80 text-xs transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <span className="px-3 py-1.5 font-mono text-xs text-white/70">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages || loading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed text-white/80 text-xs transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
