"use client";

import { useState } from "react";
import {
  Mail,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Eye,
  X,
  Send,
} from "lucide-react";

export default function ContactLeadsSection({
  inquiries = [],
  summary = {},
  statusFilter = "all",
  onStatusFilterChange,
  currentPage = 1,
  totalPages = 1,
  totalCount = 0,
  onPageChange,
  loading = false,
  onUpdateStatus,
  onDeleteInquiry,
}) {
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const filterOptions = [
    { key: "all", label: "All Leads", count: totalCount },
    { key: "NEW", label: "New", count: summary.new || 0 },
    { key: "READ", label: "Read", count: summary.read || 0 },
    { key: "CONTACTED", label: "Contacted", count: summary.contacted || 0 },
  ];

  return (
    <div className="flex-1 flex flex-col space-y-4 w-full">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="bg-[#090A0E] border border-white/[0.08] p-1 rounded-lg inline-flex items-center gap-1 overflow-x-auto max-w-full">
          {filterOptions.map((opt) => {
            const isActive = statusFilter === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => onStatusFilterChange(opt.key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-white/[0.08] text-white font-semibold"
                    : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`text-xs font-mono px-2 py-0.5 rounded-md ${
                    isActive
                      ? "bg-white/[0.1] text-white/90"
                      : "bg-white/[0.04] text-white/40"
                  }`}
                >
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-xs sm:text-sm text-white/50 font-mono">
          Total Inbound: <span className="text-white/90 font-medium">{totalCount}</span>
        </p>
      </div>

      {/* Leads Table */}
      <div className="bg-[#090A0E] border border-white/[0.08] rounded-xl overflow-hidden flex-1 flex flex-col justify-between">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 className="w-6 h-6 text-[#33E6D8] animate-spin mb-3" />
            <p className="text-xs text-white/40 font-mono">Loading inquiries...</p>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-6">
            <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-3">
              <Mail className="w-5 h-5 text-white/40" />
            </div>
            <h3
              className="text-base font-bold text-white mb-1 font-heading"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              No Contact Inquiries Found
            </h3>
            <p className="text-xs text-white/40 max-w-sm">
              Inbound messages submitted via the contact form will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02] text-xs uppercase font-mono text-white/50 tracking-wider">
                  <th className="px-5 py-3.5 font-semibold">Sender</th>
                  <th className="px-5 py-3.5 font-semibold">Subject & Message</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 font-semibold">Received</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-sm">
                {inquiries.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Sender */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div>
                          <p className="font-semibold text-white tracking-tight text-sm">
                            {lead.fullName}
                          </p>
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-xs text-white/45 hover:text-[#33E6D8] font-mono transition-colors"
                          >
                            {lead.email}
                          </a>
                        </div>
                      </div>
                    </td>

                    {/* Subject & Message */}
                    <td className="px-5 py-3.5 max-w-md">
                      <p className="font-medium text-white/90 truncate text-sm">{lead.subject}</p>
                      <p className="text-xs text-white/50 truncate mt-0.5">{lead.message}</p>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-block text-xs font-mono font-medium px-2 py-0.5 rounded-md ${
                          lead.status === "NEW"
                            ? "text-[#33E6D8] bg-[#33E6D8]/10 border border-[#33E6D8]/20"
                            : lead.status === "CONTACTED"
                            ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                            : "text-white/40 bg-white/[0.04] border border-white/[0.06]"
                        }`}
                      >
                        {lead.status === "NEW"
                          ? "New"
                          : lead.status === "CONTACTED"
                          ? "Contacted"
                          : "Read"}
                      </span>
                    </td>

                    {/* Received */}
                    <td className="px-5 py-3.5 text-xs text-white/50 font-mono whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedInquiry(lead);
                            if (lead.status === "NEW") {
                              onUpdateStatus(lead.id, "READ");
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/[0.08] rounded-lg text-xs font-medium transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>

                        {lead.status !== "CONTACTED" && (
                          <button
                            onClick={() => onUpdateStatus(lead.id, "CONTACTED")}
                            className="px-2.5 py-1.5 bg-white/[0.02] hover:bg-white/[0.06] text-white/70 hover:text-white border border-white/[0.06] rounded-lg text-xs font-medium transition-colors cursor-pointer"
                          >
                            Mark Done
                          </button>
                        )}

                        <button
                          onClick={() => onDeleteInquiry(lead.id)}
                          className="p-1.5 text-white/35 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {totalCount > 0 && (
          <div className="px-5 py-3 border-t border-white/[0.06] bg-[#07080A] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p className="text-white/40 font-mono text-[11px]">
              Showing{" "}
              <span className="text-white/80 font-medium">
                {(currentPage - 1) * 25 + 1}
              </span>{" "}
              to{" "}
              <span className="text-white/80 font-medium">
                {Math.min(currentPage * 25, totalCount)}
              </span>{" "}
              of <span className="text-white/80 font-medium">{totalCount}</span> inquiries
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1 || loading}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed text-white/80 text-[11px] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <span className="px-2.5 py-1 font-mono text-[11px] text-white/60">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages || loading}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed text-white/80 text-[11px] transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-[#090A0E] border border-white/[0.1] rounded-xl p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-4 right-4 p-1.5 text-white/40 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                {selectedInquiry.status}
              </span>
              <span className="text-[10px] text-white/40 font-mono">
                {new Date(selectedInquiry.createdAt).toLocaleString()}
              </span>
            </div>

            <h3
              className="text-base font-bold text-white tracking-tight mb-1"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              {selectedInquiry.subject}
            </h3>
            <p className="text-xs text-white/50 mb-4">
              From: <span className="text-white/80 font-medium">{selectedInquiry.fullName}</span> (
              <a
                href={`mailto:${selectedInquiry.email}`}
                className="text-[#33E6D8] hover:underline font-mono"
              >
                {selectedInquiry.email}
              </a>
              )
            </p>

            <div className="bg-[#050608] border border-white/[0.06] rounded-lg p-4 mb-5">
              <p className="text-xs text-white/80 whitespace-pre-wrap leading-relaxed">
                {selectedInquiry.message}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="px-3.5 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/80 hover:text-white rounded-lg text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(
                  selectedInquiry.subject
                )}`}
                className="px-4 py-1.5 bg-[#33E6D8] hover:bg-[#02D5E7] text-black font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Reply via Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
