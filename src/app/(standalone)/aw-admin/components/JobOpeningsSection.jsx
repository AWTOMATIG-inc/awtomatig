"use client";

import {
  Briefcase,
  Building2,
  Edit3,
  Trash2,
  Plus,
  Loader2,
} from "lucide-react";

export default function JobOpeningsSection({
  jobs = [],
  loading = false,
  onOpenCreateModal,
  onOpenEditModal,
  onToggleStatus,
  onDeleteJob,
}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-[#090A0E] border border-white/[0.08] rounded-xl w-full">
        <Loader2 className="w-6 h-6 text-[#33E6D8] animate-spin mb-3" />
        <p className="text-xs text-white/40 font-mono">Loading job openings...</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-[#090A0E] border border-white/[0.08] rounded-xl w-full text-center px-6">
        <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-3">
          <Briefcase className="w-5 h-5 text-white/40" />
        </div>
        <h3
          className="text-base font-semibold text-white mb-1"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          No Job Openings Configured
        </h3>
        <p className="text-xs text-white/40 max-w-sm mb-5">
          Create job openings to publish roles and accept candidate applications.
        </p>
        <button
          onClick={onOpenCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#33E6D8] text-black font-semibold text-xs rounded-lg hover:bg-[#02D5E7] transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create First Opening</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-[#090A0E] border border-white/[0.08] rounded-xl p-5 flex flex-col justify-between hover:border-white/[0.15] transition-colors"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <span className="text-xs font-mono uppercase tracking-wider text-white/60 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] font-medium">
                  {job.department}
                </span>

                <span
                  className={`text-xs font-mono font-medium px-2.5 py-1 rounded-md ${
                    job.status === "PUBLISHED"
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-white/40 bg-white/[0.04] border border-white/[0.06]"
                  }`}
                >
                  {job.status === "PUBLISHED" ? "Active" : "Draft"}
                </span>
              </div>

              {/* Job Title */}
              <h4 className="text-lg font-bold text-white tracking-tight mb-2.5 font-heading">
                {job.title}
              </h4>

              {/* Meta Tags: Work Mode & Salary with Bangladesh Taka sign */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/60 font-mono mb-3.5">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/[0.05]">
                  <Building2 className="w-3.5 h-3.5 text-white/40" />
                  <span>{job.workMode || "On-site"}</span>
                </span>
                {job.salary && (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <span className="font-bold">৳</span>
                    <span>{job.salary}</span>
                  </span>
                )}
              </div>

              {/* Excerpt */}
              <p className="text-sm text-white/60 line-clamp-2 leading-relaxed mb-4">
                {job.summary}
              </p>
            </div>

            {/* Footer Bar */}
            <div className="pt-3.5 border-t border-white/[0.06] flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
              <span className="text-xs font-mono text-white/50">
                {job._count?.applications || 0} applicants
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onOpenEditModal(job)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/[0.08] rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => onToggleStatus(job.id, job.status)}
                  className="px-3 py-1.5 bg-white/[0.02] hover:bg-white/[0.06] rounded-lg text-xs text-white/70 hover:text-white border border-white/[0.06] transition-colors cursor-pointer"
                >
                  {job.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => onDeleteJob(job.id, job.title)}
                  className="p-1.5 hover:bg-rose-500/10 text-white/35 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                  title="Archive Opening"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
