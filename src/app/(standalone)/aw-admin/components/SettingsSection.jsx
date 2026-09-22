"use client";

import {
  Camera,
  Trash2,
  Lock,
  Check,
  AlertCircle,
  X,
  Loader2,
  User,
} from "lucide-react";

export default function SettingsSection({
  currentUser,
  form,
  onChangeForm,
  avatarPreview,
  removeAvatar,
  onAvatarSelect,
  onRemoveAvatar,
  onSubmit,
  loading = false,
  status = null,
  onClearStatus,
}) {
  return (
    <div className="w-full space-y-6">
      {/* Status Notice Banner */}
      {status && (
        <div
          className={`p-3.5 rounded-lg text-xs flex items-center justify-between border ${
            status.type === "success"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border-rose-500/20"
          }`}
        >
          <div className="flex items-center gap-2">
            {status.type === "success" ? (
              <Check className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{status.message}</span>
          </div>
          <button
            type="button"
            onClick={onClearStatus}
            className="p-1 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Symmetrical Two-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Card 1: Profile & Brand Identity */}
          <div className="bg-[#090A0E] border border-white/[0.08] rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-4 mb-5 border-b border-white/[0.08]">
                <div className="p-2 rounded-lg bg-white/[0.04] text-[#33E6D8] border border-white/[0.08]">
                  <User className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight font-heading">
                    Profile & Brand Identity
                  </h3>
                  <p className="text-xs text-white/50 mt-0.5">
                    Administrator details, email, and brand avatar
                  </p>
                </div>
              </div>

              {/* Avatar Uploader Row */}
              <div className="p-4 bg-[#050608] border border-white/[0.06] rounded-xl flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-xl bg-white/[0.04] border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : currentUser?.avatarUrl && !removeAvatar ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt="Current Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40 font-mono text-lg font-bold">
                      {(currentUser?.fullName || "A")[0]?.toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 flex-1">
                  <p className="text-xs font-semibold text-white/90">Logo / Avatar</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.1] text-white/90 border border-white/[0.1] rounded-lg text-xs font-medium cursor-pointer transition-colors">
                      <Camera className="w-3.5 h-3.5" />
                      <span>
                        {avatarPreview || (currentUser?.avatarUrl && !removeAvatar)
                          ? "Change"
                          : "Upload"}
                      </span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={onAvatarSelect}
                        className="hidden"
                      />
                    </label>

                    {(avatarPreview || (currentUser?.avatarUrl && !removeAvatar)) && (
                      <button
                        type="button"
                        onClick={onRemoveAvatar}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-white/35 font-mono">
                    PNG, JPG, WebP (Max 5MB)
                  </p>
                </div>
              </div>

              {/* Name & Email Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-2 font-medium">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) =>
                      onChangeForm({ ...form, fullName: e.target.value })
                    }
                    placeholder="e.g. Administrator"
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-2 font-medium">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      onChangeForm({ ...form, email: e.target.value })
                    }
                    placeholder="admin@awtomatig.com"
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8] transition-colors"
                  />
                  <p className="text-xs text-white/40 mt-1.5 font-mono">
                    Used for administrator authentication and email alerts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Security & Password */}
          <div className="bg-[#090A0E] border border-white/[0.08] rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-4 mb-5 border-b border-white/[0.08]">
                <div className="p-2 rounded-lg bg-white/[0.04] text-[#33E6D8] border border-white/[0.08]">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight font-heading">
                    Security & Authentication
                  </h3>
                  <p className="text-xs text-white/50 mt-0.5">
                    Update administrative login password
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-2 font-medium">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={form.currentPassword}
                    onChange={(e) =>
                      onChangeForm({ ...form, currentPassword: e.target.value })
                    }
                    placeholder="Enter current password to authorize"
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-2 font-medium">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={form.newPassword}
                    onChange={(e) =>
                      onChangeForm({ ...form, newPassword: e.target.value })
                    }
                    placeholder="Minimum 6 characters"
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-2 font-medium">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      onChangeForm({ ...form, confirmPassword: e.target.value })
                    }
                    placeholder="Re-enter new password"
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 mt-5 border-t border-white/[0.06]">
              <p className="text-xs text-white/45 leading-relaxed font-mono">
                Leave password inputs blank if you only want to update name or avatar.
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#33E6D8] hover:bg-[#02D5E7] disabled:opacity-50 text-black font-semibold text-sm rounded-lg transition-colors cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
