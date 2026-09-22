"use client";

import { Edit3, ArrowRight, ExternalLink } from "lucide-react";

export default function OverviewSection({
  jobs = [],
  summary = {},
  stages = [],
  onNavigateTab,
  onOpenEditJob,
}) {
  const publishedJobs = jobs.filter((j) => j.status === "PUBLISHED");
  const draftJobs = jobs.filter((j) => j.status === "DRAFT");
  const totalCandidates = summary.all || 0;

  return (
    <div className="space-y-6 w-full">
      {/* 1. Integrated KPI Metric Bar */}
      <div className="bg-[#090A0E] border border-white/[0.08] rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] overflow-hidden">
        <div className="p-5">
          <p className="text-xs font-mono uppercase tracking-wider text-white/45 mb-2 font-semibold">
            Active Job Openings
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white font-mono">
              {publishedJobs.length}
            </span>
            <span className="text-xs text-white/45 font-mono">
              / {jobs.length} total
            </span>
          </div>
          <p className="text-xs text-white/45 mt-2.5 font-mono">
            {draftJobs.length} in draft status
          </p>
        </div>

        <div className="p-5">
          <p className="text-xs font-mono uppercase tracking-wider text-white/45 mb-2 font-semibold">
            Total Candidates
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white font-mono">
              {totalCandidates}
            </span>
            <span className="text-xs text-[#33E6D8] font-mono font-medium">
              +{summary.highPriority || 0} priority
            </span>
          </div>
          <p className="text-xs text-white/45 mt-2.5 font-mono">
            Across all active positions
          </p>
        </div>

        <div className="p-5">
          <p className="text-xs font-mono uppercase tracking-wider text-white/45 mb-2 font-semibold">
            In Evaluation
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white font-mono">
              {(summary.screening || 0) + (summary.interview || 0)}
            </span>
            <span className="text-xs text-white/45 font-mono">
              in pipeline
            </span>
          </div>
          <p className="text-xs text-white/45 mt-2.5 font-mono">
            {summary.interview || 0} scheduled interviews
          </p>
        </div>

        <div className="p-5">
          <p className="text-xs font-mono uppercase tracking-wider text-white/45 mb-2 font-semibold">
            Pipeline Conversions
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white font-mono">
              {(summary.offer || 0) + (summary.hired || 0)}
            </span>
            <span className="text-xs text-white/45 font-mono">
              offers & hired
            </span>
          </div>
          <p className="text-xs text-white/45 mt-2.5 font-mono">
            {summary.hired || 0} successful hires
          </p>
        </div>
      </div>

      {/* 2. Pipeline Funnel & Stage Breakdown */}
      <div className="bg-[#090A0E] border border-white/[0.08] rounded-xl p-5 sm:p-6">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight font-heading">
              Recruitment Funnel Distribution
            </h3>
            <p className="text-xs text-white/50 mt-1">
              Current stage allocation across active candidates
            </p>
          </div>
          <button
            onClick={() => onNavigateTab("pipeline")}
            className="text-xs sm:text-sm text-[#33E6D8] hover:text-[#02D5E7] flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
          >
            <span>Candidate ATS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Proportional Stage Progress Strip */}
        {totalCandidates > 0 && (
          <div className="mb-5 space-y-1.5">
            <div className="h-2.5 w-full bg-white/[0.04] rounded-full overflow-hidden flex">
              {stages.map((stg) => {
                const count = summary[stg.key.toLowerCase()] || 0;
                const percentage = totalCandidates > 0 ? (count / totalCandidates) * 100 : 0;
                if (percentage === 0) return null;

                const bgClass =
                  stg.key === "APPLIED"
                    ? "bg-white/30"
                    : stg.key === "SCREENING"
                    ? "bg-purple-400"
                    : stg.key === "INTERVIEW"
                    ? "bg-[#33E6D8]"
                    : stg.key === "OFFER"
                    ? "bg-amber-400"
                    : stg.key === "HIRED"
                    ? "bg-emerald-400"
                    : "bg-rose-500/60";

                return (
                  <div
                    key={stg.key}
                    style={{ width: `${percentage}%` }}
                    className={`${bgClass} transition-all duration-300`}
                    title={`${stg.label}: ${count} (${percentage.toFixed(0)}%)`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Clean Stage Data Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stages.map((stg) => {
            const count = summary[stg.key.toLowerCase()] || 0;
            const dotColor =
              stg.key === "APPLIED"
                ? "bg-white/40"
                : stg.key === "SCREENING"
                ? "bg-purple-400"
                : stg.key === "INTERVIEW"
                ? "bg-[#33E6D8]"
                : stg.key === "OFFER"
                ? "bg-amber-400"
                : stg.key === "HIRED"
                ? "bg-emerald-400"
                : "bg-rose-400";

            return (
              <div
                key={stg.key}
                className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3.5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-white/60 font-medium">
                    {stg.label}
                  </span>
                </div>
                <div className="mt-3.5 flex items-baseline justify-between">
                  <span className="text-2xl font-bold tracking-tight text-white font-mono">
                    {count}
                  </span>
                  <span className="text-xs text-white/35 font-mono">
                    {totalCandidates > 0
                      ? `${((count / totalCandidates) * 100).toFixed(0)}%`
                      : "0%"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Job Openings Quick Overview Table */}
      <div className="bg-[#090A0E] border border-white/[0.08] rounded-xl p-5 sm:p-6">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight font-heading">
              Open Positions Matrix
            </h3>
            <p className="text-xs text-white/50 mt-1">
              Active openings and incoming candidate counts
            </p>
          </div>
          <button
            onClick={() => onNavigateTab("jobs")}
            className="text-xs sm:text-sm text-[#33E6D8] hover:text-[#02D5E7] flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
          >
            <span>Manage All Openings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {jobs.length === 0 ? (
          <div className="py-8 text-center text-white/40 text-sm font-mono">
            No job openings configured yet.
          </div>
        ) : (
          <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
            <table className="w-full text-left border-collapse min-w-[580px]">
              <thead>
                <tr className="border-b border-white/[0.06] text-xs font-mono uppercase text-white/50 tracking-wider">
                  <th className="pb-3.5 font-semibold">Position</th>
                  <th className="pb-3.5 font-semibold">Department</th>
                  <th className="pb-3.5 font-semibold">Work Mode</th>
                  <th className="pb-3.5 font-semibold">Status</th>
                  <th className="pb-3.5 font-semibold text-right">Applicants</th>
                  <th className="pb-3.5 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-sm">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 pr-4">
                      <p className="font-semibold text-white tracking-tight text-sm">{job.title}</p>
                      <p className="text-xs text-white/40 font-mono truncate max-w-xs mt-0.5">
                        {job.slug}
                      </p>
                    </td>
                    <td className="py-3.5 pr-4 text-white/70 text-sm">
                      {job.department}
                    </td>
                    <td className="py-3.5 pr-4 text-white/60 text-xs font-mono">
                      {job.workMode || "On-site"}
                    </td>
                    <td className="py-3.5 pr-4">
                      <span
                        className={`inline-block text-xs font-mono font-medium px-2 py-0.5 rounded-md ${
                          job.status === "PUBLISHED"
                            ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                            : "text-white/40 bg-white/[0.04] border border-white/[0.06]"
                        }`}
                      >
                        {job.status === "PUBLISHED" ? "Active" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-right font-mono font-medium text-white/80 text-sm">
                      {job._count?.applications || 0}
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => onOpenEditJob(job)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/80 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
