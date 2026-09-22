"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle2,
  UploadCloud,
  FileText,
  X,
  AlertCircle,
  Loader2,
  Sparkles,
  Plus,
  Trash2,
  GraduationCap,
  Globe,
  Banknote,
} from "lucide-react";
import MarkdownView from "@/components/MarkdownView";

function formatOptionLabel(opt, questionId) {
  if (!opt) return "";
  const map = {
    // Experience level options
    none: "Fresher",
    fresher: "Fresher",
    lt_6m: "0 – 1 Year",
    "0_1y": "0 – 1 Year",
    "0-1y": "0 – 1 Year",
    "6m_1y": "1 – 3 Years",
    "1_3y": "1 – 3 Years",
    "1-3y": "1 – 3 Years",
    gt_1y: "3+ Years",
    "3y_plus": "3+ Years",
    "3y+": "3+ Years",
    "gt_3y": "3+ Years",

    // Next.js experience options
    lt_1m: "< 1 Month (Just getting started)",
    "1_3m": "1 – 3 Months",
    "3_6m": "3 – 6 Months",
    "6_12m": "6 – 12 Months",
    "1y_plus": "1+ Year",

    // UI/UX Design experience options
    just_starting: "Fresher / Academic Projects",
    few_personal_projects: "Personal & Practice Projects",
    multiple_real_projects: "Multiple Real-World Projects",
    freelance_client: "1+ Year Client / Freelance Experience",
  };

  const key = String(opt).toLowerCase();
  if (map[key]) {
    return map[key];
  }

  return String(opt)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function JobDetailPage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [location, setLocation] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [deployedUrl, setDeployedUrl] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [customAnswers, setCustomAnswers] = useState({});

  // Educational Background State
  const [educationList, setEducationList] = useState([
    { level: "Bachelor's / Undergraduate", institute: "", major: "", passingYear: "" },
  ]);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`/api/jobs/${slug}`);
        const data = await res.json();
        if (data.success) {
          setJob(data.job);
        } else {
          setError(data.message || "Job not found.");
        }
      } catch (err) {
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [slug]);

  function handleFileDrop(e) {
    e.preventDefault();
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    if (files && files[0]) {
      validateAndSetFile(files[0]);
    }
  }

  function validateAndSetFile(file) {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      alert("Only PDF files are accepted for resumes.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Resume file size must be less than 5MB.");
      return;
    }
    setResumeFile(file);
  }

  function handleCustomAnswer(fieldId, value) {
    setCustomAnswers((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  }

  function handlePhoneChange(val) {
    setPhone(val);
    const digits = val.replace(/\D/g, "");
    const normalized = digits.startsWith("880") && digits.length === 13 ? digits.slice(2) : digits;
    if (val.trim() && normalized.length !== 11) {
      setPhoneError("Phone number must be exactly 11 digits (e.g. 01712345678)");
    } else {
      setPhoneError("");
    }
  }

  function handleAddEducation() {
    setEducationList((prev) => [
      ...prev,
      { level: "Bachelor's / Undergraduate", institute: "", major: "", passingYear: "" },
    ]);
  }

  function handleRemoveEducation(index) {
    if (educationList.length <= 1) return;
    setEducationList((prev) => prev.filter((_, i) => i !== index));
  }

  function handleUpdateEducation(index, field, value) {
    setEducationList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    // Validate 11-digit phone
    const digits = phone.replace(/\D/g, "");
    const normalizedPhone = digits.startsWith("880") && digits.length === 13 ? digits.slice(2) : digits;
    if (normalizedPhone.length !== 11) {
      setSubmitError("Phone number must be exactly 11 digits (e.g. 01712345678).");
      setPhoneError("11 digits required");
      return;
    }

    // Validate Resume file
    if (!resumeFile) {
      setSubmitError("Please attach your Resume / CV in PDF format.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("jobSlug", slug);
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", normalizedPhone);
      if (location) formData.append("location", location);
      if (githubUrl) formData.append("githubUrl", githubUrl);
      if (portfolioUrl) formData.append("portfolioUrl", portfolioUrl);
      if (linkedinUrl) formData.append("linkedinUrl", linkedinUrl);
      if (deployedUrl) formData.append("deployedUrl", deployedUrl);
      if (resumeFile) formData.append("resume", resumeFile);
      formData.append("education", JSON.stringify(educationList));
      formData.append("customAnswers", JSON.stringify(customAnswers));

      const res = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit application.");
      }

      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#33E6D8] animate-spin" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#050507] text-white pt-32 pb-20 px-4 sm:px-6 text-center">
        <div className="w-full max-w-7xl mx-auto bg-[#0B0C10] border border-white/10 rounded-2xl p-8">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Job Opening Not Found</h2>
          <p className="text-sm text-white/50 mb-6">{error || "This position may have been closed or archived."}</p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#33E6D8] text-black font-semibold text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050507] text-white pt-28 pb-24 px-4 sm:px-6">
      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#02d5e8]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="w-full max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-white/50 hover:text-[#33E6D8] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Openings</span>
        </Link>

        {/* Job Header */}
        <div className="bg-[#0B0C10] border border-white/10 rounded-3xl p-8 sm:p-10 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#33E6D8]/5 rounded-full blur-3xl pointer-events-none" />

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6 text-white">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm sm:text-base text-white/70 mb-6">
            {/* Department */}
            {job.department && (
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#33E6D8]" />
                <span className="text-white/90 font-medium">{job.department}</span>
              </div>
            )}

            {/* Job Type */}
            {job.type && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#33E6D8]" />
                <span className="text-white/80">
                  {job.type === "FULL_TIME"
                    ? "Full-time"
                    : job.type === "PART_TIME"
                    ? "Part-time"
                    : job.type === "INTERNSHIP"
                    ? "Internship"
                    : job.type === "CONTRACT"
                    ? "Contract"
                    : job.type}
                </span>
              </div>
            )}

            {/* Work Mode */}
            {job.workMode && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#33E6D8]" />
                <span className="text-white/80">{job.workMode}</span>
              </div>
            )}

            {/* Location */}
            {job.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#33E6D8]" />
                <span className="text-white/80">
                  {job.location.replace(/\s*\((On-site|Remote|Hybrid)\)/gi, "").trim()}
                </span>
              </div>
            )}

            {/* Compensation / Salary */}
            {job.salary && (
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <Banknote className="w-4 h-4 text-emerald-400" />
                <span>{job.salary}</span>
              </div>
            )}
          </div>

          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-3xl">
            {job.summary}
          </p>
        </div>

        {/* Two-column layout: Specs & Application Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Requirements & Benefits */}
          <div className="lg:col-span-5 space-y-8">
            {/* Key Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-[#0B0C10] border border-white/10 rounded-2xl p-6 sm:p-7">
                <h3 className="text-xl font-heading font-bold text-white mb-4 flex items-center gap-2">
                  <span>Key Requirements</span>
                </h3>
                <ul className="space-y-3">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="text-sm sm:text-base text-white/80 flex items-start gap-3 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#33E6D8] mt-2 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Perks & Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="bg-[#0B0C10] border border-white/10 rounded-2xl p-6 sm:p-7">
                <h3 className="text-xl font-heading font-bold text-white mb-4 flex items-center gap-2">
                  <span>What We Offer</span>
                </h3>
                <ul className="space-y-3">
                  {job.benefits.map((ben, idx) => (
                    <li key={idx} className="text-sm sm:text-base text-white/80 flex items-start gap-3 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#33E6D8] mt-2 shrink-0" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Markdown / Full Description */}
            {job.descriptionMarkdown && (
              <div className="bg-[#0B0C10] border border-white/10 rounded-2xl p-6 sm:p-7">
                <h3 className="text-xl font-heading font-bold text-white mb-4">
                  Role Overview
                </h3>
                <div className="mt-2">
                  <MarkdownView content={job.descriptionMarkdown} />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Application Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0B0C10] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
              {submitSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#33E6D8]/20 text-[#33E6D8] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 max-w-md mx-auto mb-8 leading-relaxed">
                    Thank you for applying to <strong className="text-white">{job.title}</strong> at AWTOMATIG. Our recruitment team has received your application and resume. We review every application thoroughly.
                  </p>
                  <Link
                    href="/careers"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#33E6D8] text-black font-semibold text-sm transition-transform hover:scale-105"
                  >
                    Browse Other Roles
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-1.5">
                      Apply For This Position
                    </h3>
                    <p className="text-sm text-white/60">
                      Fill out your information below. Takes about 2–3 minutes.
                    </p>
                  </div>

                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Section 1: Basic Information */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-[#33E6D8]">
                        1. Basic Information
                      </h4>
                      <span className="text-xs text-white/40 font-mono">Personal Details</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wide text-white/70 mb-1.5 font-mono font-medium">
                          Full Name <span className="text-[#33E6D8]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Zahid Hasan"
                          className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wide text-white/70 mb-1.5 font-mono font-medium">
                          Email Address <span className="text-[#33E6D8]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="zahid@example.com"
                          className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs uppercase tracking-wide text-white/70 font-mono font-medium">
                            Phone / WhatsApp (11 Digits) <span className="text-[#33E6D8]">*</span>
                          </label>
                          <span className="text-xs text-white/40 font-mono">e.g. 01712345678</span>
                        </div>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          placeholder="01XXXXXXXXX"
                          maxLength={15}
                          className={`w-full bg-[#050507] border rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                            phoneError
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-white/10 focus:border-[#33E6D8]"
                          }`}
                        />
                        {phoneError && (
                          <p className="text-xs text-red-400 mt-1 font-mono">{phoneError}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wide text-white/70 mb-1.5 font-mono font-medium">
                          Current Location
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Dhanmondi, Dhaka"
                          className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Online Presence & Portfolios */}
                  {(() => {
                    const portfolioFields = Array.isArray(job?.customQuestions?.portfolioFields)
                      ? job.customQuestions.portfolioFields
                      : ["linkedin", "portfolio", "github", "deployed"];

                    return (
                      <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-[#33E6D8]">
                            2. Online Presence & Portfolios
                          </h4>
                          <span className="text-xs text-white/40 font-mono">Professional Profiles</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* LinkedIn Profile is always shown */}
                          <div>
                            <label className="block text-xs uppercase tracking-wide text-white/70 mb-1.5 font-mono font-medium">
                              LinkedIn Profile <span className="text-[#33E6D8]">*</span>
                            </label>
                            <input
                              type="url"
                              required
                              value={linkedinUrl}
                              onChange={(e) => setLinkedinUrl(e.target.value)}
                              placeholder="https://linkedin.com/in/username"
                              className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8] transition-colors"
                            />
                          </div>

                          {/* GitHub Profile */}
                          {portfolioFields.includes("github") && (
                            <div>
                              <label className="block text-xs uppercase tracking-wide text-white/70 mb-1.5 font-mono font-medium">
                                GitHub Profile
                              </label>
                              <input
                                type="url"
                                value={githubUrl}
                                onChange={(e) => setGithubUrl(e.target.value)}
                                placeholder="https://github.com/username"
                                className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8] transition-colors"
                              />
                            </div>
                          )}

                          {/* Portfolio Website */}
                          {portfolioFields.includes("portfolio") && (
                            <div>
                              <label className="block text-xs uppercase tracking-wide text-white/70 mb-1.5 font-mono font-medium">
                                Portfolio / Personal Website
                              </label>
                              <input
                                type="url"
                                value={portfolioUrl}
                                onChange={(e) => setPortfolioUrl(e.target.value)}
                                placeholder="https://myportfolio.dev"
                                className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8] transition-colors"
                              />
                            </div>
                          )}

                          {/* Live Deployed Project URL */}
                          {portfolioFields.includes("deployed") && (
                            <div>
                              <label className="block text-xs uppercase tracking-wide text-white/70 mb-1.5 font-mono font-medium">
                                Live Deployed Project URL
                              </label>
                              <input
                                type="url"
                                value={deployedUrl}
                                onChange={(e) => setDeployedUrl(e.target.value)}
                                placeholder="https://project.vercel.app"
                                className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8] transition-colors"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Section 3: Educational Background */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#33E6D8]" />
                        <h4 className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-[#33E6D8]">
                          3. Educational Background
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddEducation}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#33E6D8]/10 hover:bg-[#33E6D8]/20 border border-[#33E6D8]/30 text-[#33E6D8] text-xs font-mono font-medium transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Education</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {educationList.map((edu, idx) => (
                        <div
                          key={idx}
                          className="bg-[#050507] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3 relative"
                        >
                          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                            <span className="text-xs font-mono uppercase tracking-wider text-white/50">
                              Qualification #{idx + 1}
                            </span>
                            {educationList.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveEducation(idx)}
                                className="text-white/40 hover:text-red-400 p-1 rounded transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono"
                                title="Remove qualification"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove</span>
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-xs uppercase tracking-wide text-white/70 mb-1.5 font-mono font-medium">
                                Education Level <span className="text-[#33E6D8]">*</span>
                              </label>
                              <select
                                required
                                value={edu.level}
                                onChange={(e) => handleUpdateEducation(idx, "level", e.target.value)}
                                className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#33E6D8] cursor-pointer"
                              >
                                <option value="Bachelor's / Undergraduate">Bachelor&apos;s / Undergraduate</option>
                                <option value="Master's / Postgraduate">Master&apos;s / Postgraduate</option>
                                <option value="Diploma / Technical">Diploma / Technical Degree</option>
                                <option value="Higher Secondary (HSC / A-Level)">Higher Secondary (HSC / A-Level)</option>
                                <option value="Secondary (SSC / O-Level)">Secondary (SSC / O-Level)</option>
                                <option value="Other Certification">Other Certification</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs uppercase tracking-wide text-white/70 mb-1.5 font-mono font-medium">
                                Institute / University Name <span className="text-[#33E6D8]">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={edu.institute}
                                onChange={(e) => handleUpdateEducation(idx, "institute", e.target.value)}
                                placeholder="e.g. University of Dhaka, BUET, BRAC"
                                className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-xs uppercase tracking-wide text-white/70 mb-1.5 font-mono font-medium">
                                Major / Department / Concentration
                              </label>
                              <input
                                type="text"
                                value={edu.major}
                                onChange={(e) => handleUpdateEducation(idx, "major", e.target.value)}
                                placeholder="e.g. Computer Science & Engineering"
                                className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8]"
                              />
                            </div>

                            <div>
                              <label className="block text-xs uppercase tracking-wide text-white/70 mb-1.5 font-mono font-medium">
                                Passing Year / Status <span className="text-[#33E6D8]">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={edu.passingYear}
                                onChange={(e) => handleUpdateEducation(idx, "passingYear", e.target.value)}
                                placeholder="e.g. 2024, 2025, or Currently Pursuing"
                                className="w-full bg-[#090A0E] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8]"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 4: Role-Specific Screening Questions */}
                  {(() => {
                    const screeningQuestions = Array.isArray(job.customQuestions)
                      ? job.customQuestions
                      : (Array.isArray(job.customQuestions?.screeningQuestions)
                          ? job.customQuestions.screeningQuestions
                          : []);

                    if (screeningQuestions.length === 0) return null;

                    return (
                      <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-[#33E6D8]">
                            4. Screening Questions
                          </h4>
                          <span className="text-xs text-white/40 font-mono">Role Screening</span>
                        </div>

                        <div className="space-y-4">
                          {screeningQuestions.map((q) => (
                            <div key={q.id}>
                              <label className="block text-xs uppercase tracking-wide text-white/70 mb-1.5 font-mono font-medium">
                                {q.label}{" "}
                                {q.required ? (
                                  <span className="text-[#33E6D8]">*</span>
                                ) : (
                                  <span className="text-white/40 text-xs lowercase">(optional)</span>
                                )}
                              </label>

                              {q.type === "select" ? (
                                <select
                                  required={q.required}
                                  value={customAnswers[q.id] || ""}
                                  onChange={(e) => handleCustomAnswer(q.id, e.target.value)}
                                  className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white/90 focus:outline-none focus:border-[#33E6D8]"
                                >
                                  <option value="">Select an option</option>
                                  {q.options?.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {formatOptionLabel(opt, q.id)}
                                    </option>
                                  ))}
                                </select>
                              ) : q.type === "boolean" ? (
                                <div className="flex gap-6 pt-1">
                                  <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`bool-${q.id}`}
                                      required={q.required}
                                      checked={customAnswers[q.id] === true}
                                      onChange={() => handleCustomAnswer(q.id, true)}
                                      className="accent-[#33E6D8] w-4 h-4"
                                    />
                                    <span>Yes</span>
                                  </label>
                                  <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`bool-${q.id}`}
                                      required={q.required}
                                      checked={customAnswers[q.id] === false}
                                      onChange={() => handleCustomAnswer(q.id, false)}
                                      className="accent-[#33E6D8] w-4 h-4"
                                    />
                                    <span>No</span>
                                  </label>
                                </div>
                              ) : (
                                <input
                                  type={q.type || "text"}
                                  required={q.required}
                                  value={customAnswers[q.id] || ""}
                                  onChange={(e) => handleCustomAnswer(q.id, e.target.value)}
                                  placeholder={q.required ? "Your answer *" : "Your answer (optional)"}
                                  className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8]"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Section 5: Resume / CV Attachment (PDF) */}
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-[#33E6D8]">
                        5. Resume / CV Attachment (PDF) <span className="text-[#33E6D8]">*</span>
                      </h4>
                      <span className="text-xs text-white/40 font-mono">Max 5MB</span>
                    </div>

                    {resumeFile ? (
                      <div className="bg-[#050507] border border-[#33E6D8]/30 rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#33E6D8]/10 text-[#33E6D8] flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-sm font-medium text-white truncate max-w-[240px] sm:max-w-xs">
                              {resumeFile.name}
                            </p>
                            <p className="text-xs text-white/50 font-mono mt-0.5">
                              {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setResumeFile(null)}
                          className="p-1.5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleFileDrop}
                        className="border-2 border-dashed border-white/15 hover:border-[#33E6D8]/50 rounded-2xl p-7 text-center cursor-pointer transition-colors bg-[#050507]/50"
                        onClick={() => document.getElementById("resume-input").click()}
                      >
                        <input
                          id="resume-input"
                          type="file"
                          accept=".pdf,application/pdf"
                          className="hidden"
                          onChange={handleFileDrop}
                        />
                        <UploadCloud className="w-9 h-9 text-[#33E6D8] mx-auto mb-2.5 opacity-80" />
                        <p className="text-sm font-medium text-white mb-1">
                          Click to upload or drag & drop your resume PDF
                        </p>
                        <p className="text-xs text-white/40 font-mono">
                          PDF format only • Max file size 5MB
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#33E6D8] hover:bg-[#02D5E7] disabled:opacity-50 text-black font-bold py-4 px-6 rounded-xl text-sm sm:text-base uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(51,230,216,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Processing Application...</span>
                        </>
                      ) : (
                        <span>Submit Application</span>
                      )}
                    </button>
                    <p className="text-center text-xs text-white/40 mt-3 font-mono">
                      By submitting, you consent to AWTOMATIG reviewing your profile and portfolio materials for recruitment purposes.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
