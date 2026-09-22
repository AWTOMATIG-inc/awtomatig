"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function ToastContainer({ toasts = [], onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-20 right-6 z-[99999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";
        const isInfo = toast.type === "info" || (!isSuccess && !isError);

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-3 fade-in ${
              isSuccess
                ? "bg-[#0A120E]/95 border-emerald-500/30 text-white shadow-emerald-950/20"
                : isError
                ? "bg-[#150A0C]/95 border-red-500/30 text-white shadow-red-950/20"
                : "bg-[#090C14]/95 border-[#33E6D8]/30 text-white shadow-cyan-950/20"
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {isError && <AlertCircle className="w-4 h-4 text-red-400" />}
              {isInfo && <Info className="w-4 h-4 text-[#33E6D8]" />}
            </div>

            <div className="flex-1 overflow-hidden">
              {toast.title && (
                <p className="text-xs font-semibold text-white tracking-tight">
                  {toast.title}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="shrink-0 p-1 text-white/40 hover:text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
