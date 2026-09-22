"use client";

import {
  X,
  Star,
  ExternalLink,
  FileText,
  MessageSquare,
  Send,
  Loader2,
  Mail,
  Phone,
  Globe,
  Code2,
  Share2,
  GraduationCap,
  HelpCircle,
} from "lucide-react";

export default function CandidateDrawer({
  candidate,
  loading = false,
  stages = [],
  newNote = "",
  onNoteChange,
  onAddNote,
  noteSubmitting = false,
  onUpdateCandidate,
  onClose,
}) {
  if (!candidate && !loading) return null;

  function getSafeExternalUrl(url) {
    if (!url || typeof url !== "string") return null;
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#090A0E] border-l border-white/[0.08] h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="h-16 px-4 sm:px-6 border-b border-white/[0.08] flex items-center justify-between bg-[#07080A] shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <h3 className="text-base sm:text-lg font-heading font-bold text-white tracking-tight truncate max-w-[160px] sm:max-w-xs">
                  {candidate?.fullName || "Candidate Dossier"}
                </h3>
                {candidate?.job?.title && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-white/70 border border-white/[0.06] truncate max-w-[120px] sm:max-w-none">
                    {candidate.job.title}
                  </span>
                )}
              </div>
              <p className="text-xs text-white/40 font-mono mt-0.5">
                Applied on{" "}
                {candidate?.createdAt
                  ? new Date(candidate.createdAt).toLocaleDateString()
                  : "—"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {loading || !candidate ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-[#33E6D8] animate-spin" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
            {/* Quick Metadata & Evaluation Strip */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5 font-medium">
                  Current Pipeline Stage
                </p>
                <select
                  value={candidate.stage}
                  onChange={(e) =>
                    onUpdateCandidate(candidate.id, { stage: e.target.value })
                  }
                  className="bg-[#050608] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#33E6D8] transition-colors cursor-pointer"
                >
                  {stages.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5 font-medium">
                  Recruiter Rating
                </p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() =>
                        onUpdateCandidate(candidate.id, { rating: star })
                      }
                      className="p-0.5 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= (candidate.rating || 0)
                            ? "text-amber-400 fill-amber-400"
                            : "text-white/20"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5 font-medium">
                  Suitability Score
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-base font-bold text-[#33E6D8]">
                    {candidate.score}
                  </span>
                  <span className="text-xs font-mono text-white/40">/ 100</span>
                  <span className="text-xs font-mono text-white/60 ml-1">
                    ({candidate.priority?.replace("_PRIORITY", "")})
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider text-white/50 font-medium">
                Contact & Channels
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3.5 flex items-center gap-3">
                  <Mail className="w-4 h-4 text-white/40 shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-xs font-mono text-white/40">Email</p>
                    <a
                      href={`mailto:${candidate.email}`}
                      className="text-sm text-[#33E6D8] hover:underline truncate block"
                    >
                      {candidate.email}
                    </a>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3.5 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-white/40 shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-xs font-mono text-white/40">Phone</p>
                    <a
                      href={`tel:${candidate.phone}`}
                      className="text-sm text-white/90 hover:underline truncate block"
                    >
                      {candidate.phone || "Not provided"}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* External Links */}
            {(candidate.portfolioUrl ||
              candidate.githubUrl ||
              candidate.deployedUrl ||
              candidate.linkedinUrl) && (
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-white/50 font-medium">
                  Links & Portfolio
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {getSafeExternalUrl(candidate.portfolioUrl) && (
                    <a
                      href={getSafeExternalUrl(candidate.portfolioUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-white/80 hover:text-white transition-colors"
                    >
                      <Globe className="w-4 h-4 text-[#33E6D8]" />
                      <span>Portfolio</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/30" />
                    </a>
                  )}
                  {getSafeExternalUrl(candidate.githubUrl) && (
                    <a
                      href={getSafeExternalUrl(candidate.githubUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-white/80 hover:text-white transition-colors"
                    >
                      <Code2 className="w-4 h-4 text-white/60" />
                      <span>GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/30" />
                    </a>
                  )}
                  {getSafeExternalUrl(candidate.deployedUrl) && (
                    <a
                      href={getSafeExternalUrl(candidate.deployedUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-white/80 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-emerald-400" />
                      <span>Live Project</span>
                    </a>
                  )}
                  {getSafeExternalUrl(candidate.linkedinUrl) && (
                    <a
                      href={getSafeExternalUrl(candidate.linkedinUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-white/80 hover:text-white transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-blue-400" />
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/30" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Educational Background */}
            {(() => {
              const eduList = Array.isArray(candidate.customAnswers?._education)
                ? candidate.customAnswers._education
                : (candidate.customAnswers?.university ? [{
                    level: "Undergraduate / Degree",
                    institute: candidate.customAnswers.university,
                    major: candidate.customAnswers.department || "N/A",
                    passingYear: candidate.customAnswers.graduation_year || "N/A",
                  }] : []);

              if (eduList.length === 0) return null;

              return (
                <div className="space-y-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-white/50 flex items-center gap-1.5 font-medium">
                    <GraduationCap className="w-4 h-4 text-[#33E6D8]" />
                    <span>Educational Background ({eduList.length})</span>
                  </p>
                  <div className="space-y-2.5">
                    {eduList.map((edu, idx) => (
                      <div
                        key={idx}
                        className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3.5 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-white">
                            {edu.institute || "Institution"}
                          </span>
                          {edu.passingYear && (
                            <span className="text-xs font-mono bg-white/[0.06] text-white/70 px-2 py-0.5 rounded">
                              Pass: {edu.passingYear}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/70">
                          {edu.level && (
                            <span className="text-[#33E6D8] font-mono">
                              {edu.level}
                            </span>
                          )}
                          {edu.level && edu.major && <span>•</span>}
                          {edu.major && <span>{edu.major}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Screening Questions Answers */}
            {(() => {
              const answers = candidate.customAnswers || {};
              const entries = Object.entries(answers).filter(([k]) => k !== "_education");
              if (entries.length === 0) return null;

              return (
                <div className="space-y-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-white/50 flex items-center gap-1.5 font-medium">
                    <HelpCircle className="w-4 h-4 text-[#33E6D8]" />
                    <span>Screening Question Answers</span>
                  </p>
                  <div className="space-y-2">
                    {entries.map(([qKey, aVal]) => {
                      let displayVal = aVal;
                      if (typeof aVal === "boolean") {
                        displayVal = aVal ? "Yes" : "No";
                      } else if (Array.isArray(aVal)) {
                        displayVal = aVal.join(", ");
                      } else if (typeof aVal === "object" && aVal !== null) {
                        displayVal = JSON.stringify(aVal);
                      }
                      const formattedKey = qKey
                        .replace(/^sq_\d+_?/, "")
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase());

                      return (
                        <div
                          key={qKey}
                          className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 flex items-start justify-between gap-3 text-sm"
                        >
                          <span className="text-white/60 font-mono text-xs sm:text-sm">
                            {formattedKey}
                          </span>
                          <span className="text-white font-medium text-right max-w-[240px] break-words">
                            {String(displayVal || "—")}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Resume Attachment */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono uppercase tracking-wider text-white/50 flex items-center gap-1.5 font-medium">
                  <FileText className="w-4 h-4 text-[#33E6D8]" />
                  <span>Resume Attachment</span>
                </p>
                {candidate.resumePath && (
                  <a
                    href={`/api/admin/applications/${candidate.id}/resume`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#33E6D8] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Full Screen</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {candidate.resumePath ? (
                <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-black/40">
                  <iframe
                    src={`/api/admin/applications/${candidate.id}/resume`}
                    className="w-full h-80 border-0"
                    title="Candidate Resume"
                  />
                </div>
              ) : (
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 text-center text-xs text-white/40 font-mono">
                  No resume attachment was uploaded.
                </div>
              )}
            </div>

            {/* Internal Recruiter Notes Timeline */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono uppercase tracking-wider text-white/50 flex items-center gap-1.5 font-medium">
                  <MessageSquare className="w-4 h-4 text-[#33E6D8]" />
                  <span>Evaluation Notes ({candidate.notes?.length || 0})</span>
                </p>
              </div>

              <form onSubmit={onAddNote} className="space-y-2">
                <div className="relative">
                  <textarea
                    rows="2"
                    value={newNote}
                    onChange={(e) => onNoteChange(e.target.value)}
                    placeholder="Add an evaluation note or interview feedback..."
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8] transition-colors resize-none leading-relaxed"
                  />
                  <button
                    type="submit"
                    disabled={!newNote.trim() || noteSubmitting}
                    className="absolute right-3 bottom-3 p-2 bg-[#33E6D8] hover:bg-[#02D5E7] disabled:opacity-30 disabled:cursor-not-allowed text-black rounded-lg transition-all cursor-pointer"
                  >
                    {noteSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </form>

              <div className="space-y-2.5 pt-1">
                {candidate.notes?.map((n) => (
                  <div
                    key={n.id}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3.5 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white/90">
                        {n.author?.fullName || "Recruiter"}
                      </span>
                      <span className="text-xs text-white/40 font-mono">
                        {new Date(n.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">
                      {n.content}
                    </p>
                  </div>
                ))}

                {(!candidate.notes || candidate.notes.length === 0) && (
                  <p className="text-xs sm:text-sm text-white/40 text-center py-4 font-mono">
                    No recruiter notes recorded yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
