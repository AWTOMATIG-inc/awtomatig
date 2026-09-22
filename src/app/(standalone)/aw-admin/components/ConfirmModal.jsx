"use client";

import { AlertTriangle, X, Loader2 } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmLabel = "Confirm",
  confirmVariant = "danger", // "danger" | "primary"
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#090A0E] border border-white/[0.1] rounded-xl p-6 shadow-2xl relative">
        <button
          onClick={onCancel}
          disabled={loading}
          className="absolute top-4 right-4 p-1.5 text-white/40 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5">
          <div
            className={`p-2 rounded-lg shrink-0 ${
              confirmVariant === "danger"
                ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                : "bg-[#33E6D8]/10 text-[#33E6D8] border border-[#33E6D8]/20"
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <h3
              className="text-sm font-bold text-white tracking-tight mb-1"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              {title}
            </h3>
            <p className="text-xs text-white/60 leading-relaxed mb-5">
              {message}
            </p>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="px-3.5 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg text-xs text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className={`flex items-center gap-1.5 px-4 py-1.5 font-semibold text-xs rounded-lg transition-colors cursor-pointer ${
                  confirmVariant === "danger"
                    ? "bg-rose-500 hover:bg-rose-600 text-white"
                    : "bg-[#33E6D8] hover:bg-[#02D5E7] text-black"
                }`}
              >
                {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{confirmLabel}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
