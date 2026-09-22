"use client";

import { useState } from "react";
import {
  X,
  Loader2,
  Plus,
  Trash2,
  Briefcase,
  FileText,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Eye,
  Edit3,
} from "lucide-react";
import MarkdownView from "@/components/MarkdownView";

export default function JobModal({
  isOpen,
  mode = "create", // "create" | "edit"
  form,
  onChange,
  onSubmit,
  submitting = false,
  onClose,
}) {
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "description" | "application"
  const [descPreview, setDescPreview] = useState(false);

  if (!isOpen) return null;

  const portfolioFields = Array.isArray(form.portfolioFields)
    ? form.portfolioFields
    : ["linkedin", "github", "portfolio"];

  const screeningQuestions = Array.isArray(form.screeningQuestions)
    ? form.screeningQuestions
    : [];

  const togglePortfolioField = (field, checked) => {
    let updated = [...portfolioFields];
    if (checked && !updated.includes(field)) {
      updated.push(field);
    } else if (!checked) {
      updated = updated.filter((f) => f !== field);
    }
    onChange({ ...form, portfolioFields: updated });
  };

  const handleAddQuestion = () => {
    const newQ = {
      id: `sq_${Date.now()}`,
      label: "",
      type: "text",
      options: [],
      required: true,
    };
    onChange({
      ...form,
      screeningQuestions: [...screeningQuestions, newQ],
    });
  };

  const handleUpdateQuestion = (index, patch) => {
    const updated = screeningQuestions.map((q, i) => (i === index ? { ...q, ...patch } : q));
    onChange({ ...form, screeningQuestions: updated });
  };

  const handleRemoveQuestion = (index) => {
    const updated = screeningQuestions.filter((_, i) => i !== index);
    onChange({ ...form, screeningQuestions: updated });
  };

  const tabs = [
    { id: "overview", label: "1. Overview & Specs", icon: Briefcase },
    { id: "description", label: "2. Description & Requirements", icon: FileText },
    {
      id: "application",
      label: `3. Form & Screening (${screeningQuestions.length})`,
      icon: HelpCircle,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-5xl bg-[#090A0E] border border-white/[0.12] rounded-2xl shadow-2xl relative my-auto flex flex-col max-h-[92vh] overflow-hidden">
        {/* Sticky Header */}
        <div className="p-5 sm:p-6 border-b border-white/[0.08] bg-[#090A0E] relative flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#33E6D8] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md bg-[#33E6D8]/10 border border-[#33E6D8]/20">
                {mode === "create" ? "New Job Opening" : "Update Opening"}
              </span>
              <span className="text-white/30 text-xs">•</span>
              <span className="text-xs sm:text-sm text-white/60 font-mono">
                {form.department || "Engineering"}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight mt-2">
              {form.title || (mode === "create" ? "Create Job Opening" : "Edit Job Opening")}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-2 px-5 sm:px-6 pt-3 pb-0 border-b border-white/[0.08] bg-black/20 shrink-0 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-4 rounded-t-lg text-xs sm:text-sm font-mono tracking-wide transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "border-[#33E6D8] text-[#33E6D8] bg-white/[0.04] font-semibold"
                    : "border-transparent text-white/50 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Form Body - Scrollable */}
        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* TAB 1: OVERVIEW & SPECS */}
          {activeTab === "overview" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-7">
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5 font-medium">
                    Job Title <span className="text-[#33E6D8]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      onChange({
                        ...form,
                        title,
                        ...(mode === "create" && !form.slugManual
                          ? {
                              slug: title
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/^-|-$/g, ""),
                            }
                          : {}),
                      });
                    }}
                    placeholder="e.g. Senior Full-Stack Engineer"
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-[#33E6D8] transition-colors"
                  />
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5 font-medium">
                    URL Slug <span className="text-[#33E6D8]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) =>
                      onChange({
                        ...form,
                        slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                        slugManual: true,
                      })
                    }
                    placeholder="e.g. senior-full-stack-engineer"
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white font-mono focus:outline-none focus:border-[#33E6D8] transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Department, Job Type & Work Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5 font-medium">
                    Department <span className="text-[#33E6D8]">*</span>
                  </label>
                  <select
                    value={form.department}
                    onChange={(e) => onChange({ ...form, department: e.target.value })}
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-xl px-3.5 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-[#33E6D8] transition-colors cursor-pointer"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design / UI-UX</option>
                    <option value="Marketing">Marketing / SEO</option>
                    <option value="Product">Product</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5 font-medium">
                    Job Type <span className="text-[#33E6D8]">*</span>
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => onChange({ ...form, type: e.target.value })}
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-xl px-3.5 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-[#33E6D8] transition-colors cursor-pointer"
                  >
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="INTERNSHIP">Internship</option>
                    <option value="CONTRACT">Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5 font-medium">
                    Work Mode <span className="text-[#33E6D8]">*</span>
                  </label>
                  <select
                    value={form.workMode}
                    onChange={(e) => onChange({ ...form, workMode: e.target.value })}
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-xl px-3.5 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-[#33E6D8] transition-colors cursor-pointer"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Location, Salary & Visibility */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5 font-medium">
                    Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => onChange({ ...form, location: e.target.value })}
                    placeholder="e.g. Dhaka, Bangladesh (On-site)"
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-[#33E6D8] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5 font-medium">
                    Salary / Compensation (৳)
                  </label>
                  <input
                    type="text"
                    value={form.salary}
                    onChange={(e) => onChange({ ...form, salary: e.target.value })}
                    placeholder="e.g. ৳30,000 - ৳50,000 / month"
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-[#33E6D8] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5 font-medium">
                    Visibility Status <span className="text-[#33E6D8]">*</span>
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => onChange({ ...form, status: e.target.value })}
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-xl px-3.5 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-[#33E6D8] transition-colors cursor-pointer"
                  >
                    <option value="PUBLISHED">Published (Live on site)</option>
                    <option value="DRAFT">Draft (Internal only)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Summary Excerpt */}
              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1.5 font-medium">
                  Summary Excerpt <span className="text-[#33E6D8]">*</span>
                </label>
                <textarea
                  required
                  rows="3"
                  value={form.summary}
                  onChange={(e) => onChange({ ...form, summary: e.target.value })}
                  placeholder="Short 1-2 sentence preview for cards and career listing..."
                  className="w-full bg-[#050608] border border-white/[0.08] rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-[#33E6D8] transition-colors resize-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 2: DESCRIPTION & REQUIREMENTS */}
          {activeTab === "description" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono uppercase text-white/60 font-medium">
                    Role Description (Markdown) <span className="text-[#33E6D8]">*</span>
                  </label>
                  <div className="flex items-center gap-1 bg-[#050608] border border-white/10 rounded-lg p-0.5">
                    <button
                      type="button"
                      onClick={() => setDescPreview(false)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                        !descPreview
                          ? "bg-white/10 text-white font-medium"
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      <Edit3 className="w-3 h-3" />
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setDescPreview(true)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                        descPreview
                          ? "bg-[#33E6D8]/20 text-[#33E6D8] font-medium"
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      Preview
                    </button>
                  </div>
                </div>

                {!descPreview ? (
                  <textarea
                    required
                    rows="8"
                    value={form.descriptionMarkdown}
                    onChange={(e) => onChange({ ...form, descriptionMarkdown: e.target.value })}
                    placeholder="### About the Role&#10;Write full responsibilities, tech stack, and workflow..."
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-[#33E6D8] transition-colors leading-relaxed"
                  />
                ) : (
                  <div className="w-full min-h-[200px] max-h-[300px] overflow-y-auto bg-[#050608] border border-white/[0.08] rounded-xl p-5 text-sm">
                    {form.descriptionMarkdown ? (
                      <MarkdownView content={form.descriptionMarkdown} />
                    ) : (
                      <p className="text-white/30 italic text-sm">No description markdown entered yet.</p>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono uppercase text-white/60 font-medium">
                      Key Requirements (One per line)
                    </label>
                    <span className="text-xs text-white/40 font-mono">Bullet points</span>
                  </div>
                  <textarea
                    rows="5"
                    value={form.requirements}
                    onChange={(e) => onChange({ ...form, requirements: e.target.value })}
                    placeholder="Proficiency in Next.js & React&#10;PostgreSQL & Prisma experience&#10;Clean architecture mindset"
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-xl px-4 py-3 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-[#33E6D8] transition-colors leading-relaxed"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono uppercase text-white/60 font-medium">
                      What We Offer (One per line)
                    </label>
                    <span className="text-xs text-white/40 font-mono">Bullet points</span>
                  </div>
                  <textarea
                    rows="5"
                    value={form.benefits}
                    onChange={(e) => onChange({ ...form, benefits: e.target.value })}
                    placeholder="Mentorship from senior engineers&#10;Competitive compensation (৳)&#10;Modern toolset & fast growth"
                    className="w-full bg-[#050608] border border-white/[0.08] rounded-xl px-4 py-3 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-[#33E6D8] transition-colors leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: APPLICATION FORM & SCREENING QUESTIONS */}
          {activeTab === "application" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Online Presence & Portfolios Selection */}
              <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs sm:text-sm font-mono uppercase text-[#33E6D8] font-semibold tracking-wider">
                      Candidate Online Presence & Portfolios
                    </label>
                    <p className="text-xs text-white/50 mt-0.5">
                      Choose which link fields candidates should submit for this position.
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-[#33E6D8]/10 text-[#33E6D8] px-2.5 py-1 rounded-md border border-[#33E6D8]/20 font-medium">
                    LinkedIn Default
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white/90 select-none">
                    <input type="checkbox" checked disabled className="accent-[#33E6D8] rounded w-4 h-4" />
                    <div>
                      <p className="text-sm font-mono font-medium">LinkedIn</p>
                      <p className="text-xs text-[#33E6D8]">Always Included</p>
                    </div>
                  </div>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] text-white/80 cursor-pointer select-none transition-colors">
                    <input
                      type="checkbox"
                      checked={portfolioFields.includes("github")}
                      onChange={(e) => togglePortfolioField("github", e.target.checked)}
                      className="accent-[#33E6D8] rounded w-4 h-4"
                    />
                    <div>
                      <p className="text-sm font-mono font-medium text-white">GitHub</p>
                      <p className="text-xs text-white/40">Repositories & code</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] text-white/80 cursor-pointer select-none transition-colors">
                    <input
                      type="checkbox"
                      checked={portfolioFields.includes("portfolio")}
                      onChange={(e) => togglePortfolioField("portfolio", e.target.checked)}
                      className="accent-[#33E6D8] rounded w-4 h-4"
                    />
                    <div>
                      <p className="text-sm font-mono font-medium text-white">Portfolio</p>
                      <p className="text-xs text-white/40">Personal site</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] text-white/80 cursor-pointer select-none transition-colors">
                    <input
                      type="checkbox"
                      checked={portfolioFields.includes("deployed")}
                      onChange={(e) => togglePortfolioField("deployed", e.target.checked)}
                      className="accent-[#33E6D8] rounded w-4 h-4"
                    />
                    <div>
                      <p className="text-sm font-mono font-medium text-white">Live Project</p>
                      <p className="text-xs text-white/40">Deployed app URL</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Dynamic Screening Questions Builder */}
              <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs sm:text-sm font-mono uppercase text-[#33E6D8] font-semibold tracking-wider">
                      Screening Questions ({screeningQuestions.length})
                    </label>
                    <p className="text-xs text-white/50 mt-0.5">
                      Configure custom role questions. Toggle &quot;Mandatory&quot; to require answers or leave optional.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#33E6D8]/10 hover:bg-[#33E6D8]/20 border border-[#33E6D8]/30 text-[#33E6D8] text-xs sm:text-sm font-mono transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Question</span>
                  </button>
                </div>

                {screeningQuestions.length === 0 ? (
                  <div className="p-8 rounded-xl border border-dashed border-white/[0.1] text-center space-y-2">
                    <HelpCircle className="w-8 h-8 text-white/20 mx-auto" />
                    <p className="text-xs sm:text-sm text-white/40 font-mono">
                      No screening questions added yet.
                    </p>
                    <button
                      type="button"
                      onClick={handleAddQuestion}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#33E6D8] hover:underline font-mono"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add your first question</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {screeningQuestions.map((q, idx) => (
                      <div
                        key={q.id || idx}
                        className="p-4 bg-[#050608] border border-white/[0.08] rounded-xl space-y-3 relative hover:border-white/[0.15] transition-colors"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
                          {/* Question Prompt */}
                          <div className="sm:col-span-6">
                            <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                              Question #{idx + 1} Prompt <span className="text-[#33E6D8]">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={q.label}
                              onChange={(e) => handleUpdateQuestion(idx, { label: e.target.value })}
                              placeholder="e.g. Can you work on-site in Dhaka?"
                              className="w-full bg-[#090A0E] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#33E6D8]"
                            />
                          </div>

                          {/* Answer Type */}
                          <div className="sm:col-span-3">
                            <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                              Answer Type
                            </label>
                            <select
                              value={q.type}
                              onChange={(e) => handleUpdateQuestion(idx, { type: e.target.value })}
                              className="w-full bg-[#090A0E] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#33E6D8] cursor-pointer"
                            >
                              <option value="text">Single-Line Text</option>
                              <option value="boolean">Yes / No (Radio)</option>
                              <option value="select">Dropdown Selection</option>
                              <option value="number">Numeric</option>
                            </select>
                          </div>

                          {/* Mandatory Toggle & Delete */}
                          <div className="sm:col-span-3 flex items-center justify-between pt-2 sm:pt-5">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={q.required}
                                onChange={(e) =>
                                  handleUpdateQuestion(idx, { required: e.target.checked })
                                }
                                className="accent-[#33E6D8] rounded w-4 h-4"
                              />
                              <span className="text-xs font-mono">
                                {q.required ? (
                                  <span className="text-[#33E6D8] font-semibold">Mandatory *</span>
                                ) : (
                                  <span className="text-white/40">Optional</span>
                                )}
                              </span>
                            </label>

                            <button
                              type="button"
                              onClick={() => handleRemoveQuestion(idx)}
                              className="p-2 text-white/30 hover:text-red-400 hover:bg-white/[0.05] rounded-lg transition-colors cursor-pointer"
                              title="Remove question"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Dropdown Options (if select) */}
                        {q.type === "select" && (
                          <div className="pt-1">
                            <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                              Options (Comma separated)
                            </label>
                            <input
                              type="text"
                              value={Array.isArray(q.options) ? q.options.join(", ") : q.options || ""}
                              onChange={(e) =>
                                handleUpdateQuestion(idx, {
                                  options: e.target.value
                                    .split(",")
                                    .map((s) => s.trim())
                                    .filter(Boolean),
                                })
                              }
                              placeholder="Fresher, 0-1 year, 1-3 year, 3 years+"
                              className="w-full bg-[#090A0E] border border-white/[0.08] rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#33E6D8]"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sticky Modal Footer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-white/[0.08] mt-6 bg-[#090A0E] shrink-0">
            {/* Left: Tab switch helpers */}
            <div className="flex items-center justify-between sm:justify-start gap-2">
              {activeTab !== "overview" && (
                <button
                  type="button"
                  onClick={() =>
                    setActiveTab(activeTab === "application" ? "description" : "overview")
                  }
                  className="px-3.5 py-2 text-xs sm:text-sm font-mono text-white/60 hover:text-white flex items-center gap-1.5 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Tab</span>
                </button>
              )}
              {activeTab !== "application" && (
                <button
                  type="button"
                  onClick={() =>
                    setActiveTab(activeTab === "overview" ? "description" : "application")
                  }
                  className="px-3.5 py-2 text-xs sm:text-sm font-mono text-[#33E6D8] hover:text-[#33E6D8]/80 flex items-center gap-1.5 rounded-xl hover:bg-[#33E6D8]/10 transition-colors cursor-pointer ml-auto sm:ml-0"
                >
                  <span>Next: {activeTab === "overview" ? "Description" : "Screening"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/80 hover:text-white rounded-xl transition-colors cursor-pointer text-xs sm:text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-[#33E6D8] hover:bg-[#02D5E7] disabled:opacity-50 text-black font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer text-xs sm:text-sm shadow-lg shadow-[#33E6D8]/15"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Opening...</span>
                  </>
                ) : (
                  <span>{mode === "create" ? "Create Opening" : "Save Changes"}</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
