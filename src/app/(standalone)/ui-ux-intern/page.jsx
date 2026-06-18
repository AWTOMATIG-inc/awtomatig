"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const TOTAL_STEPS = 6;
const STEP_TITLES = {
  1: "Basic Information",
  2: "Design Experience",
  3: "Portfolio Review",
  4: "Design Thinking",
  5: "Availability & Fit",
  6: "Final Questions",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/[^\s]+\.[^\s]+$/i;
const BD_PHONE_RE = /^(?:\+?880)?01[3-9]\d{8}$/;

const font = { fontFamily: '"Space Grotesk", sans-serif' };

const inputClass =
  "w-full font-body text-[0.97rem] text-white bg-[#050507] border border-white/10 rounded-lg px-3.5 py-3 placeholder-white/30 transition-colors duration-150 focus:outline-none focus:border-[#33E6D8] focus:shadow-[0_0_0_3px_rgba(51,230,216,0.16)]";
const textareaClass =
  "w-full font-body text-[0.97rem] text-white bg-[#050507] border border-white/10 rounded-lg px-3.5 py-3 placeholder-white/30 resize-none transition-colors duration-150 focus:outline-none focus:border-[#33E6D8] focus:shadow-[0_0_0_3px_rgba(51,230,216,0.16)]";
const labelClass =
  "block font-display text-[11px] uppercase tracking-wide text-white/50 mb-2";

function RadioCard({ name, value, label, checked, onChange }) {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />
      <span className="block border border-white/10 rounded-lg px-4 py-3 text-sm text-white/80 peer-checked:border-[#33E6D8] peer-checked:bg-[#33E6D8]/10 peer-checked:text-white transition-colors duration-150">
        {label}
      </span>
    </label>
  );
}

function CheckCard({ name, value, label, checked, onChange }) {
  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />
      <span className="block border border-white/10 rounded-lg px-3 py-3 text-sm text-center text-white/80 peer-checked:border-[#33E6D8] peer-checked:bg-[#33E6D8]/10 peer-checked:text-white transition-colors duration-150">
        {label}
      </span>
    </label>
  );
}

function FieldError({ error }) {
  if (!error) return null;
  return <p className="text-[12.5px] text-[#E15A72] mt-1.5">{error}</p>;
}

function computePriority(data) {
  const hasPortfolio = URL_RE.test(data.portfolio_url);
  const hasFigma = data.tools_used.includes("figma");
  const onsiteOk = data.onsite_available === "yes";
  const commitOk = data.three_month_commitment === "yes";

  if (!hasPortfolio || !hasFigma || !onsiteOk || !commitOk) return "low_priority";

  let score = 0;

  const expMap = { just_starting: 0, few_personal_projects: 1, multiple_real_projects: 2, freelance_client: 3 };
  score += expMap[data.experience_level] || 0;

  const durMap = { lt_6m: 0, "6_12m": 1, "1_2y": 2, "2y_plus": 3 };
  score += durMap[data.design_duration] || 0;

  const countMap = { "1_2": 0, "3_5": 1, "6_10": 2, "10_plus": 3 };
  score += countMap[data.portfolio_project_count] || 0;

  const toolCount = data.tools_used.length;
  score += toolCount >= 4 ? 2 : toolCount >= 2 ? 1 : 0;

  const typeCount = data.project_types.length;
  score += typeCount >= 4 ? 2 : typeCount >= 2 ? 1 : 0;

  if (URL_RE.test(data.design_profile_url)) score += 1;

  return score >= 7 ? "high_priority" : "medium_priority";
}

export default function UiUxInternApplication() {
  const formCardRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [fd, setFd] = useState({
    full_name: "",
    email: "",
    phone: "",
    linkedin_url: "",
    portfolio_url: "",
    design_profile_url: "",
    experience_level: "",
    tools_used: [],
    design_duration: "",
    portfolio_project_count: "",
    project_types: [],
    proud_project: "",
    project_role: "",
    conversion_review_answer: "",
    rejected_design_answer: "",
    feedback_comfort: "",
    onsite_available: "",
    three_month_commitment: "",
    current_status: "",
    start_date: "",
    why_awtomatig: "",
    extra_note: "",
  });

  function set(field, value) {
    setFd((prev) => ({ ...prev, [field]: value }));
  }

  function toggleArray(field, value) {
    setFd((prev) => {
      const arr = prev[field];
      return { ...prev, [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  }

  function validateStep(n) {
    const e = {};

    if (n === 1) {
      if (!fd.full_name.trim()) e.full_name = "Full name is required.";
      if (!fd.email.trim() || !EMAIL_RE.test(fd.email.trim())) e.email = "Enter a valid email address.";
      if (!fd.phone.trim()) e.phone = "Phone / WhatsApp number is required.";
      if (fd.phone.trim() && !BD_PHONE_RE.test(fd.phone.trim().replace(/[\s-]/g, ""))) e.phone = "Please enter a valid Bangladeshi phone number (e.g., 01712345678 or +8801712345678).";
      if (fd.linkedin_url && !URL_RE.test(fd.linkedin_url)) e.linkedin_url = "Enter a valid URL.";
      if (!fd.portfolio_url || !URL_RE.test(fd.portfolio_url)) e.portfolio_url = "A valid portfolio URL is required.";
      if (fd.design_profile_url && !URL_RE.test(fd.design_profile_url)) e.design_profile_url = "Enter a valid URL.";
    }

    if (n === 2) {
      if (!fd.experience_level) e.experience_level = "Please select one option.";
      if (fd.tools_used.length === 0) e.tools_used = "Select at least one tool.";
      if (!fd.design_duration) e.design_duration = "Please select one option.";
    }

    if (n === 3) {
      if (!fd.portfolio_project_count) e.portfolio_project_count = "Please select one option.";
      if (fd.project_types.length === 0) e.project_types = "Select at least one project type.";
      if (!fd.proud_project.trim()) e.proud_project = "This field is required.";
      if (!fd.project_role.trim()) e.project_role = "This field is required.";
    }

    if (n === 4) {
      if (!fd.conversion_review_answer) e.conversion_review_answer = "Please select one option.";
      if (!fd.rejected_design_answer) e.rejected_design_answer = "Please select one option.";
      if (!fd.feedback_comfort) e.feedback_comfort = "Please select one option.";
    }

    if (n === 5) {
      if (!fd.onsite_available) e.onsite_available = "Please select one option.";
      if (!fd.three_month_commitment) e.three_month_commitment = "Please select one option.";
      if (!fd.current_status) e.current_status = "Please select one option.";
      if (!fd.start_date) e.start_date = "Select an available start date.";
    }

    if (n === 6) {
      if (!fd.why_awtomatig.trim()) e.why_awtomatig = "Please tell us why you want to join.";
    }

    return e;
  }

  function handleNext() {
    const stepErrors = validateStep(currentStep);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
      formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    handleSubmit();
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  async function handleSubmit() {
    setFormError("");
    setSubmitting(true);

    const data = {
      ...fd,
      email: fd.email.trim().toLowerCase(),
      submitted_at: new Date().toISOString(),
    };
    data.priority = computePriority(data);

    try {
      const res = await fetch("/api/recruitment/ui-ux-intern", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({}));

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Application submission failed.");
      }

      setSubmitted(true);
    } catch (err) {
      setFormError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const progressWidth = ((currentStep / TOTAL_STEPS) * 100) + "%";

  function errorBorder(field) {
    return errors[field] ? { borderColor: "#E15A72" } : {};
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#050507] text-white font-body antialiased flex items-center justify-center px-6">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');`}</style>
        <div className="bg-[#0B0C10] border border-white/10 rounded-2xl p-9 sm:p-12 text-center max-w-[560px] w-full">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#33E6D8]/15 border border-[#33E6D8] text-[#33E6D8] text-xl mb-5">&#10003;</span>
          <h2 className="font-bold text-white text-[1.4rem] mb-3" style={font}>Application submitted successfully.</h2>
          <p className="text-white/55 text-sm max-w-[460px] mx-auto leading-relaxed">
            Thank you for completing the UI/UX Intern screening form. Our team will review your portfolio, experience, and responses. If there is a strong fit, we will contact you for the next step.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white font-body text-base leading-relaxed antialiased" style={{ fontFamily: "Inter, -apple-system, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap'); input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1) opacity(0.6); cursor: pointer; }`}</style>

      {/* Progress rail */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/10 z-50" aria-hidden="true">
        <div className="h-full bg-[#33E6D8] shadow-[0_0_10px_1px_rgba(51,230,216,0.6)] transition-[width] duration-300" style={{ width: progressWidth }} />
      </div>

      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-[760px] mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image src="/favicon.png" alt="AWTOMATIG" width={20} height={20} />
            <span className="font-bold text-white tracking-[0.04em] text-sm" style={font}>AWTOMATIG</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 border border-white/10 rounded-full px-2.5 py-1" style={font}>Recruitment Dossier</span>
        </div>
      </header>

      <main className="max-w-[760px] mx-auto px-6 py-12 sm:py-16">

        {/* Intro */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#33E6D8] mb-3" style={font}>Careers &mdash; UI/UX Design Internship</p>
          <h1 className="font-bold text-white text-[clamp(1.65rem,4vw,2.4rem)] leading-tight mb-3" style={font}>UI/UX Design Intern<br />Application</h1>
          <p className="text-white/55 text-[0.97rem] max-w-[560px]">
            This form is the first screening step for the AWTOMATIG UI/UX Design Intern role. Have your portfolio link ready &mdash; it&apos;s the single most important part of this application.
          </p>
        </div>

        {/* Form Card */}
        <div ref={formCardRef} className="bg-[#0B0C10] border border-white/10 rounded-2xl p-5 sm:p-9">

          {/* Step indicator */}
          <div className="flex items-center justify-between mb-7">
            <p className="text-xs uppercase tracking-[0.2em] text-[#33E6D8]" style={font}>
              Step {currentStep} of {TOTAL_STEPS} &mdash; {STEP_TITLES[currentStep]}
            </p>
            <p className="text-xs text-white/35" style={font}>{currentStep} / {TOTAL_STEPS}</p>
          </div>

          {/* Form error */}
          {formError && (
            <p className="text-[12.5px] leading-relaxed text-[#E15A72]/90 bg-[#E15A72]/10 border-l-[3px] border-[#E15A72] px-3.5 py-2.5 mb-6 rounded-md" role="alert">{formError}</p>
          )}

          {/* ===================== STEP 1 ===================== */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className={labelClass} style={font}>Full Name <span className="text-[#E15A72]">*</span></label>
                <input type="text" value={fd.full_name} onChange={(e) => set("full_name", e.target.value)} className={inputClass} style={errorBorder("full_name")} autoComplete="name" />
                <FieldError error={errors.full_name} />
              </div>
              <div>
                <label className={labelClass} style={font}>Email Address <span className="text-[#E15A72]">*</span></label>
                <input type="email" value={fd.email} onChange={(e) => set("email", e.target.value)} className={inputClass} style={errorBorder("email")} autoComplete="email" />
                <FieldError error={errors.email} />
              </div>
              <div>
                <label className={labelClass} style={font}>Phone / WhatsApp Number <span className="text-[#E15A72]">*</span></label>
                <input type="tel" value={fd.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} style={errorBorder("phone")} autoComplete="tel" />
                <FieldError error={errors.phone} />
              </div>
              <div>
                <label className={labelClass} style={font}>LinkedIn Profile</label>
                <input type="url" value={fd.linkedin_url} onChange={(e) => set("linkedin_url", e.target.value)} className={inputClass} style={errorBorder("linkedin_url")} placeholder="https://linkedin.com/in/..." />
                <FieldError error={errors.linkedin_url} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} style={font}>Portfolio URL <span className="text-[#E15A72]">*</span></label>
                <input type="url" value={fd.portfolio_url} onChange={(e) => set("portfolio_url", e.target.value)} className={inputClass} style={errorBorder("portfolio_url")} placeholder="https://..." />
                <p className="text-white/35 text-xs mt-1.5">This is the most important link in your application &mdash; make sure it&apos;s live and up to date.</p>
                <FieldError error={errors.portfolio_url} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} style={font}>Behance / Dribbble / Figma Community Link</label>
                <input type="url" value={fd.design_profile_url} onChange={(e) => set("design_profile_url", e.target.value)} className={inputClass} style={errorBorder("design_profile_url")} placeholder="https://..." />
                <FieldError error={errors.design_profile_url} />
              </div>
            </div>
          )}

          {/* ===================== STEP 2 ===================== */}
          {currentStep === 2 && (
            <div>
              <div className="mb-7">
                <label className={labelClass} style={font}>How would you describe your UI/UX experience? <span className="text-[#E15A72]">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[["just_starting", "Just getting started"], ["few_personal_projects", "Built a few personal projects"], ["multiple_real_projects", "Designed multiple real projects"], ["freelance_client", "Freelance or client experience"]].map(([v, l]) => (
                    <RadioCard key={v} name="experience_level" value={v} label={l} checked={fd.experience_level === v} onChange={() => set("experience_level", v)} />
                  ))}
                </div>
                <FieldError error={errors.experience_level} />
              </div>
              <div className="mb-7">
                <label className={labelClass} style={font}>Which tools do you use regularly? <span className="text-[#E15A72]">*</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[["figma", "Figma"], ["adobe_xd", "Adobe XD"], ["photoshop", "Photoshop"], ["illustrator", "Illustrator"], ["canva", "Canva"], ["framer", "Framer"], ["other", "Other"]].map(([v, l]) => (
                    <CheckCard key={v} name="tools_used" value={v} label={l} checked={fd.tools_used.includes(v)} onChange={() => toggleArray("tools_used", v)} />
                  ))}
                </div>
                <FieldError error={errors.tools_used} />
              </div>
              <div>
                <label className={labelClass} style={font}>How long have you been designing? <span className="text-[#E15A72]">*</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[["lt_6m", "< 6 months"], ["6_12m", "6–12 months"], ["1_2y", "1–2 years"], ["2y_plus", "2+ years"]].map(([v, l]) => (
                    <RadioCard key={v} name="design_duration" value={v} label={l} checked={fd.design_duration === v} onChange={() => set("design_duration", v)} />
                  ))}
                </div>
                <FieldError error={errors.design_duration} />
              </div>
            </div>
          )}

          {/* ===================== STEP 3 ===================== */}
          {currentStep === 3 && (
            <div>
              <div className="mb-7">
                <label className={labelClass} style={font}>How many completed design projects are in your portfolio? <span className="text-[#E15A72]">*</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[["1_2", "1–2"], ["3_5", "3–5"], ["6_10", "6–10"], ["10_plus", "10+"]].map(([v, l]) => (
                    <RadioCard key={v} name="portfolio_project_count" value={v} label={l} checked={fd.portfolio_project_count === v} onChange={() => set("portfolio_project_count", v)} />
                  ))}
                </div>
                <FieldError error={errors.portfolio_project_count} />
              </div>
              <div className="mb-7">
                <label className={labelClass} style={font}>What types of projects have you designed? <span className="text-[#E15A72]">*</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[["websites", "Websites"], ["dashboards", "Dashboards"], ["mobile_apps", "Mobile Apps"], ["landing_pages", "Landing Pages"], ["ecommerce", "E-commerce"], ["branding", "Branding"], ["graphics_social", "Graphics / Social Media"]].map(([v, l]) => (
                    <CheckCard key={v} name="project_types" value={v} label={l} checked={fd.project_types.includes(v)} onChange={() => toggleArray("project_types", v)} />
                  ))}
                </div>
                <FieldError error={errors.project_types} />
              </div>
              <div className="mb-7">
                <label className={labelClass} style={font}>Paste the link or title of the project you are most proud of <span className="text-[#E15A72]">*</span></label>
                <textarea rows={3} value={fd.proud_project} onChange={(e) => set("proud_project", e.target.value)} className={textareaClass} style={errorBorder("proud_project")} />
                <FieldError error={errors.proud_project} />
              </div>
              <div>
                <label className={labelClass} style={font}>What was your role in that project? <span className="text-[#E15A72]">*</span></label>
                <textarea rows={3} value={fd.project_role} onChange={(e) => set("project_role", e.target.value)} className={textareaClass} style={errorBorder("project_role")} />
                <FieldError error={errors.project_role} />
              </div>
            </div>
          )}

          {/* ===================== STEP 4 ===================== */}
          {currentStep === 4 && (
            <div>
              <div className="mb-7">
                <label className={labelClass} style={font}>You receive a website with poor conversions. What would you review first? <span className="text-[#E15A72]">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[["colors", "Colors"], ["typography", "Typography"], ["user_flow", "User Flow"], ["images", "Images"], ["not_sure", "I am not sure"]].map(([v, l]) => (
                    <RadioCard key={v} name="conversion_review_answer" value={v} label={l} checked={fd.conversion_review_answer === v} onChange={() => set("conversion_review_answer", v)} />
                  ))}
                </div>
                <FieldError error={errors.conversion_review_answer} />
              </div>
              <div className="mb-7">
                <label className={labelClass} style={font}>A client rejects your first design concept. What would you do? <span className="text-[#E15A72]">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[["defend_design", "Defend my design"], ["ask_feedback_iterate", "Ask for feedback and iterate"], ["start_over", "Start over completely"], ["wait_instructions", "Wait for instructions"]].map(([v, l]) => (
                    <RadioCard key={v} name="rejected_design_answer" value={v} label={l} checked={fd.rejected_design_answer === v} onChange={() => set("rejected_design_answer", v)} />
                  ))}
                </div>
                <FieldError error={errors.rejected_design_answer} />
              </div>
              <div>
                <label className={labelClass} style={font}>How comfortable are you receiving design feedback? <span className="text-[#E15A72]">*</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[["not_comfortable", "Not comfortable"], ["somewhat_comfortable", "Somewhat"], ["comfortable", "Comfortable"], ["very_comfortable", "Very comfortable"]].map(([v, l]) => (
                    <RadioCard key={v} name="feedback_comfort" value={v} label={l} checked={fd.feedback_comfort === v} onChange={() => set("feedback_comfort", v)} />
                  ))}
                </div>
                <FieldError error={errors.feedback_comfort} />
              </div>
            </div>
          )}

          {/* ===================== STEP 5 ===================== */}
          {currentStep === 5 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <div>
                <label className={labelClass} style={font}>Can you work from our office? <span className="text-[#E15A72]">*</span></label>
                <div className="grid grid-cols-2 gap-3">
                  {[["yes", "Yes"], ["no", "No"]].map(([v, l]) => (
                    <RadioCard key={v} name="onsite_available" value={v} label={l} checked={fd.onsite_available === v} onChange={() => set("onsite_available", v)} />
                  ))}
                </div>
                <FieldError error={errors.onsite_available} />
              </div>
              <div>
                <label className={labelClass} style={font}>Can you commit to the full 3-month internship? <span className="text-[#E15A72]">*</span></label>
                <div className="grid grid-cols-2 gap-3">
                  {[["yes", "Yes"], ["no", "No"]].map(([v, l]) => (
                    <RadioCard key={v} name="three_month_commitment" value={v} label={l} checked={fd.three_month_commitment === v} onChange={() => set("three_month_commitment", v)} />
                  ))}
                </div>
                <FieldError error={errors.three_month_commitment} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} style={font}>What is your current status? <span className="text-[#E15A72]">*</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[["fulltime_student", "Full-time student"], ["final_year_student", "Final year student"], ["recent_graduate", "Recent graduate"], ["employed_fulltime", "Employed full-time"], ["employed_parttime", "Employed part-time"], ["freelancing", "Freelancing"], ["other", "Other"]].map(([v, l]) => (
                    <RadioCard key={v} name="current_status" value={v} label={l} checked={fd.current_status === v} onChange={() => set("current_status", v)} />
                  ))}
                </div>
                <FieldError error={errors.current_status} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} style={font}>Available start date <span className="text-[#E15A72]">*</span></label>
                <input type="date" value={fd.start_date} onChange={(e) => set("start_date", e.target.value)} className={inputClass} style={errorBorder("start_date")} />
                <FieldError error={errors.start_date} />
              </div>
            </div>
          )}

          {/* ===================== STEP 6 ===================== */}
          {currentStep === 6 && (
            <div>
              <div className="mb-7">
                <label className={labelClass} style={font}>Why do you want to join AWTOMATIG? <span className="text-[#E15A72]">*</span></label>
                <textarea rows={4} value={fd.why_awtomatig} onChange={(e) => set("why_awtomatig", e.target.value)} className={textareaClass} style={errorBorder("why_awtomatig")} />
                <FieldError error={errors.why_awtomatig} />
              </div>
              <div>
                <label className={labelClass} style={font}>Anything else you would like us to know?</label>
                <textarea rows={3} value={fd.extra_note} onChange={(e) => set("extra_note", e.target.value)} className={textareaClass} />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-9 pt-7 border-t border-white/10">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="text-[13px] uppercase tracking-wide text-white/55 border border-white/10 rounded-full px-5 py-3 transition-colors duration-150 hover:text-white hover:border-white/30 disabled:opacity-0 disabled:pointer-events-none"
              style={font}
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={submitting}
              className="text-[13px] font-semibold uppercase tracking-wide text-[#050507] bg-[#33E6D8] px-7 py-3 rounded-full shadow-[0_0_24px_-4px_rgba(51,230,216,0.55)] transition-shadow duration-200 hover:shadow-[0_0_32px_-2px_rgba(51,230,216,0.85)] disabled:opacity-50 disabled:cursor-not-allowed"
              style={font}
            >
              {submitting ? "Submitting…" : currentStep === TOTAL_STEPS ? "Submit Application" : "Next"}
            </button>
          </div>
        </div>

        <p className="text-center text-white/25 text-xs mt-10">AWTOMATIG &mdash; Systems that work. Results that last.</p>
      </main>
    </div>
  );
}
