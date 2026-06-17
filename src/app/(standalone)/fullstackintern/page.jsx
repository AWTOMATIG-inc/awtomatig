"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

export default function FullStackInternApplication() {
  const formRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [experienceWarning, setExperienceWarning] = useState(false);
  const [onsiteWarning, setOnsiteWarning] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showError = useCallback((fieldId, message) => {
    setErrors((prev) => ({ ...prev, [fieldId]: message }));
  }, []);

  function validate(formData) {
    const newErrors = {};
    let firstInvalid = null;

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const URL_RE = /^https?:\/\/[^\s]+\.[^\s]+$/i;

    const required = [
      ["fullName", "Full name is required."],
      ["email", "Email address is required."],
      ["phone", "Phone / WhatsApp number is required."],
      ["location", "Current location is required."],
      ["university", "University / institution is required."],
      ["department", "Department / subject is required."],
      ["gradStatus", "Please select your graduation status."],
      ["gradYear", "Graduation year is required."],
      ["experience", "Please select your experience level."],
      ["joinTimeline", "Please select when you can join."],
      ["githubUrl", "GitHub profile URL is required."],
      ["deployedUrl", "Deployed project URL is required."],
      ["nextjsExp", "Please select your Next.js experience."],
      ["backendRating", "Please rate your backend understanding."],
      ["databaseRating", "Please rate your database understanding."],
      ["projectName", "Project name is required."],
      ["projectWhat", "Please describe what the project does."],
      ["projectTech", "Please list the technologies you used."],
      ["projectRole", "Please describe your specific role."],
      ["projectHardest", "Please describe the hardest problem you solved."],
      ["projectImprove", "Please describe what you would improve."],
      ["cleanCode", "Please answer this question."],
      ["aiUsage", "Please answer this question."],
      ["stuckBug", "Please answer this question."],
      ["collab", "Please answer this question."],
      ["whyAwtomatig", "Please tell us why you want to join AWTOMATIG."],
    ];

    required.forEach(([id, msg]) => {
      const el = document.getElementById(id);
      if (el && !el.value?.trim()) {
        newErrors[id] = msg;
        if (!firstInvalid) firstInvalid = el;
      }
    });

    const emailEl = document.getElementById("email");
    if (emailEl?.value && !EMAIL_RE.test(emailEl.value.trim())) {
      newErrors.email = "Please enter a valid email address.";
      if (!firstInvalid) firstInvalid = emailEl;
    }

    ["githubUrl", "portfolioUrl", "linkedinUrl", "deployedUrl", "projectRepoUrl"].forEach((id) => {
      const el = document.getElementById(id);
      if (el?.value && !URL_RE.test(el.value.trim())) {
        newErrors[id] = "Please enter a valid URL starting with http:// or https://";
        if (!firstInvalid) firstInvalid = el;
      }
    });

    const form = formRef.current;
    if (!form.querySelector('input[name="onsite_availability"]:checked')) {
      newErrors.onsite_availability = "Please select an option.";
      if (!firstInvalid) firstInvalid = form.querySelector('input[name="onsite_availability"]');
    }
    if (!form.querySelector('input[name="commit_3_months"]:checked')) {
      newErrors.commit_3_months = "Please select an option.";
      if (!firstInvalid) firstInvalid = form.querySelector('input[name="commit_3_months"]');
    }

    if (form.querySelectorAll('input[name="skills"]:checked').length === 0) {
      newErrors.skills = "Please select at least one option.";
      if (!firstInvalid) firstInvalid = document.getElementById("skillsGrid");
    }

    const confirmNames = ["confirm_accurate", "confirm_onsite", "confirm_3_months", "confirm_technical_task"];
    const allConfirmed = confirmNames.every((name) => form.querySelector(`input[name="${name}"]`)?.checked);
    if (!allConfirmed) {
      newErrors.confirmations = "Please check all four confirmations before submitting.";
      if (!firstInvalid) firstInvalid = form.querySelector('input[name="confirm_accurate"]');
    }

    return { errors: newErrors, firstInvalid };
  }

  function collectFormData() {
    const form = formRef.current;
    const fd = new FormData(form);
    const data = { skills: [] };

    for (const [key, value] of fd.entries()) {
      if (key === "skills") {
        data.skills.push(value);
      } else {
        data[key] = value;
      }
    }

    data.submitted_at = new Date().toISOString();

    const freshEnough = ["final_year", "fresh_graduate", "graduated_within_1yr"].includes(data.graduation_status);
    const experienceOk = ["none", "lt_6m", "6m_1y"].includes(data.experience_level);
    const onsiteOk = data.onsite_availability === "yes";
    const commitOk = data.commit_3_months === "yes";
    data.priority = freshEnough && experienceOk && onsiteOk && commitOk ? "high_priority" : "low_priority";

    return data;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    setErrors({});

    const { errors: validationErrors, firstInvalid } = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    const applicationData = collectFormData();

    try {
      const res = await fetch("/api/recruitment/full-stack-intern", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });
      const result = await res.json().catch(() => ({}));

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Application submission failed.");
      }

      setSubmitted(true);
      document.getElementById("successPanel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "w-full font-body text-[0.97rem] text-white bg-[#0B0C10] border border-white/10 rounded-lg px-3.5 py-3 placeholder-white/30 transition-colors duration-150 focus:outline-none focus:border-[#33E6D8] focus:shadow-[0_0_0_3px_rgba(51,230,216,0.16)]";
  const selectClass = `${inputClass} appearance-none pr-9 bg-[right_0.875rem_center] bg-no-repeat bg-[length:12px_8px]`;
  const selectBg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' fill='none' stroke='%238A8D99' stroke-width='1.4'/></svg>")`;
  const labelClass = "block font-display text-[11px] uppercase tracking-wide text-white/50 mb-2";
  const textareaClass = "w-full resize-y min-h-[70px] font-body text-[0.97rem] text-white bg-[#0B0C10] border border-white/10 rounded-lg px-3.5 py-3 placeholder-white/30 transition-colors duration-150 focus:outline-none focus:border-[#33E6D8] focus:shadow-[0_0_0_3px_rgba(51,230,216,0.16)]";
  const checkboxLabelClass = "flex items-center gap-2 font-body text-sm text-white/85 bg-[#0B0C10] border border-white/10 rounded-lg px-3.5 py-2.5 cursor-pointer select-none has-[:checked]:border-[#33E6D8] has-[:checked]:bg-[#33E6D8]/10";
  const radioLabelClass = "flex items-center gap-2 font-body text-sm text-white/85 bg-[#0B0C10] border border-white/10 rounded-lg px-5 py-2.5 cursor-pointer select-none has-[:checked]:border-[#33E6D8] has-[:checked]:bg-[#33E6D8]/10";

  function FieldError({ name }) {
    if (!errors[name]) return null;
    return <p className="mt-1.5 font-body text-xs text-[#E15A72]">{errors[name]}</p>;
  }

  function errorBorder(name) {
    return errors[name] ? { borderColor: "#E15A72" } : {};
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#050507] text-white font-body antialiased flex flex-col">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');`}</style>
        <section id="successPanel" className="flex-1 flex items-center justify-center py-24 text-center">
          <div className="max-w-[520px] mx-auto px-6">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#33E6D8] text-[#33E6D8] text-2xl mb-6 shadow-[0_0_24px_-4px_rgba(51,230,216,0.6)]">&#10003;</span>
            <h2 className="font-display font-bold text-white text-[clamp(1.6rem,3vw,2.1rem)] mb-3.5" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Application received</h2>
            <p className="text-white/60 text-base">Thank you for applying to AWTOMATIG. Your application has been received. Shortlisted candidates will be contacted for the next step.</p>
          </div>
        </section>

        <footer className="border-t border-white/10">
          <div className="max-w-[1152px] mx-auto px-6 sm:px-10 py-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <p className="font-bold text-white text-xl sm:text-2xl leading-tight m-0" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Systems <span className="text-[#33E6D8]">that work.</span><br />Results <span className="text-[#33E6D8]">that last.</span>
            </p>
            <p className="text-[11px] uppercase tracking-wide text-white/35 m-0" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>AWTOMATIG &middot; Full Stack Developer Intern &middot; Recruitment Form</p>
          </div>
          <div className="max-w-[1152px] mx-auto px-6 sm:px-10 pb-8">
            <div className="h-px bg-white/10 mb-5"></div>
            <p className="text-[11px] uppercase tracking-wide text-white/30 m-0" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Copyright &copy; AWTOMATIG 2026. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white font-body text-base leading-relaxed antialiased" style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');`}</style>

      {/* Progress rail */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/10 z-50" aria-hidden="true">
        <div className="h-full bg-[#33E6D8] shadow-[0_0_10px_1px_rgba(51,230,216,0.6)] transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
      </div>

      {/* Hero */}
      <section className="relative" style={{ background: "linear-gradient(135deg,#E15A72 0%,#C2628E 45%,#8C5DA0 100%)" }}>
        <nav className="max-w-[1152px] mx-auto px-6 sm:px-10 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/favicon.png" alt="AWTOMATIG" width={24} height={24} />
            <span className="font-bold text-white tracking-[0.04em] text-sm" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>AWTOMATIG</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.18em] text-white/70" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Careers &mdash; Application</span>
        </nav>

        <div className="max-w-[1152px] mx-auto px-6 sm:px-10 pt-4 pb-16 sm:pb-20">
          <p className="text-xs uppercase tracking-[0.2em] text-white/80 mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>[ Careers &mdash; Internship Programme ]</p>
          <h1 className="font-bold text-white text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] mb-5 max-w-3xl" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Full&nbsp;Stack Developer<br />Intern Application
          </h1>
          <p className="text-white/85 text-[clamp(0.98rem,1.3vw,1.08rem)] max-w-[620px] mb-8">
            This application form is the first screening step for the AWTOMATIG Full Stack Developer Intern role. Please complete it carefully &mdash; incomplete or inaccurate submissions may not be considered.
          </p>
          <ul className="flex flex-wrap gap-2.5 list-none p-0 m-0">
            {["Paid Internship", "On-site", "11:00 AM – 7:00 PM", "3 Months", "Fresh Graduate / Early Career"].map((tag) => (
              <li key={tag} className="text-[11px] uppercase tracking-wide text-white border border-white/35 bg-white/10 px-3.5 py-1.5 rounded-full" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{tag}</li>
            ))}
          </ul>
        </div>
      </section>

      <main>
        {/* Eligibility */}
        <section className="bg-[#050507] py-[clamp(40px,6vw,64px)]">
          <div className="max-w-[1152px] mx-auto px-6 sm:px-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#33E6D8] mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>[ Before you begin ]</p>
            <h2 className="font-bold text-white text-[clamp(1.5rem,3vw,2rem)] mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Who this role is for</h2>
            <p className="text-white/60 mb-8 max-w-[560px]">This role is designed for fresh graduates and early-career developers.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#0B0C10] border border-[#33E6D8]/30 rounded-2xl shadow-[0_0_28px_-6px_rgba(51,230,216,0.3)] p-6">
                <p className="text-[11px] uppercase tracking-wider text-white/50 mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Ideal candidates</p>
                <ul className="m-0 p-0 list-none space-y-2.5 text-[0.94rem] text-white/85">
                  {["Fresh graduates or final-year students", "Maximum 1 year of professional experience", "Recently graduated candidates preferred", "Must have hands-on Next.js project experience", "Must be available on-site from 11:00 AM – 7:00 PM", "Must be able to commit to 3 months"].map((item) => (
                    <li key={item} className="relative pl-6">
                      <span className="absolute left-0 top-0 text-[#33E6D8]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#0B0C10] border border-[#E15A72]/30 rounded-2xl shadow-[0_0_28px_-6px_rgba(225,90,114,0.3)] p-6">
                <p className="text-[11px] uppercase tracking-wider text-white/50 mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Not ideal for</p>
                <ul className="m-0 p-0 list-none space-y-2.5 text-[0.94rem] text-white/85">
                  {["Candidates with more than 1 year of professional full-time development experience", "Candidates who graduated many years ago and are already mid-level", "Candidates without GitHub or project work", "Candidates looking for remote-only work"].map((item) => (
                    <li key={item} className="relative pl-6">
                      <span className="absolute left-0 top-0 text-[#E15A72]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>&#10005;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className="max-w-[960px] mx-auto px-6 sm:px-10">

            {/* Section A - Basic Information */}
            <section className="py-[clamp(36px,6vw,52px)] border-b border-white/10">
              <header className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-[#33E6D8]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>[ Section A ]</span>
                  <h2 className="font-bold text-white text-[clamp(1.25rem,2.2vw,1.6rem)] m-0" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Basic Information</h2>
                </div>
                <span className="text-xs text-white/25" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>/01</span>
              </header>
              <div className="h-px bg-white/10 mt-4 mb-8"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-6">
                <div>
                  <label htmlFor="fullName" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Full Name <span className="text-[#E15A72]">*</span></label>
                  <input type="text" id="fullName" name="full_name" required autoComplete="name" className={inputClass} style={errorBorder("fullName")} />
                  <FieldError name="fullName" />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Email Address <span className="text-[#E15A72]">*</span></label>
                  <input type="email" id="email" name="email" required autoComplete="email" className={inputClass} style={errorBorder("email")} />
                  <FieldError name="email" />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Phone / WhatsApp Number <span className="text-[#E15A72]">*</span></label>
                  <input type="tel" id="phone" name="phone" required autoComplete="tel" className={inputClass} style={errorBorder("phone")} />
                  <FieldError name="phone" />
                </div>
                <div>
                  <label htmlFor="location" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Current Location <span className="text-[#E15A72]">*</span></label>
                  <input type="text" id="location" name="location" required className={inputClass} style={errorBorder("location")} />
                  <FieldError name="location" />
                </div>
                <div>
                  <label htmlFor="university" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>University / Institution <span className="text-[#E15A72]">*</span></label>
                  <input type="text" id="university" name="university" required className={inputClass} style={errorBorder("university")} />
                  <FieldError name="university" />
                </div>
                <div>
                  <label htmlFor="department" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Department / Subject <span className="text-[#E15A72]">*</span></label>
                  <input type="text" id="department" name="department" required className={inputClass} style={errorBorder("department")} />
                  <FieldError name="department" />
                </div>
                <div>
                  <label htmlFor="gradStatus" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Graduation Status <span className="text-[#E15A72]">*</span></label>
                  <select id="gradStatus" name="graduation_status" required className={selectClass} style={{ ...errorBorder("gradStatus"), backgroundImage: selectBg }}>
                    <option value="" disabled hidden>Select one</option>
                    <option value="final_year">Final-year student</option>
                    <option value="fresh_graduate">Fresh graduate</option>
                    <option value="graduated_within_1yr">Graduated within the last 1 year</option>
                    <option value="graduated_over_1yr">Graduated more than 1 year ago</option>
                  </select>
                  <FieldError name="gradStatus" />
                </div>
                <div>
                  <label htmlFor="gradYear" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Graduation Year <span className="text-[#E15A72]">*</span></label>
                  <input type="number" id="gradYear" name="graduation_year" min="2000" max="2035" required className={inputClass} style={errorBorder("gradYear")} />
                  <FieldError name="gradYear" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="experience" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Total professional development experience <span className="text-[#E15A72]">*</span></label>
                  <select id="experience" name="experience_level" required className={selectClass} style={{ ...errorBorder("experience"), backgroundImage: selectBg }} onChange={(e) => setExperienceWarning(e.target.value === "gt_1y")}>
                    <option value="" disabled hidden>Select one</option>
                    <option value="none">No professional experience yet</option>
                    <option value="lt_6m">Less than 6 months</option>
                    <option value="6m_1y">6 months to 1 year</option>
                    <option value="gt_1y">More than 1 year</option>
                  </select>
                  <FieldError name="experience" />
                  {experienceWarning && (
                    <p className="text-[12.5px] leading-relaxed text-[#E15A72]/90 bg-[#E15A72]/10 border-l-[3px] border-[#E15A72] px-3.5 py-2.5 mt-3 rounded-md">
                      This internship is mainly for fresh graduates and early-career developers. Candidates with more than 1 year of professional experience may not be prioritized.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Section B - Availability */}
            <section className="py-[clamp(36px,6vw,52px)] border-b border-white/10">
              <header className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-[#33E6D8]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>[ Section B ]</span>
                  <h2 className="font-bold text-white text-[clamp(1.25rem,2.2vw,1.6rem)] m-0" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Availability</h2>
                </div>
                <span className="text-xs text-white/25" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>/02</span>
              </header>
              <div className="h-px bg-white/10 mt-4 mb-8"></div>

              <div className="grid grid-cols-1 gap-y-6">
                <fieldset className="border-0 p-0 m-0">
                  <legend className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Are you available on-site from 11:00 AM – 7:00 PM? <span className="text-[#E15A72]">*</span></legend>
                  <div className="flex flex-wrap gap-2.5">
                    <label className={radioLabelClass}>
                      <input type="radio" name="onsite_availability" value="yes" required style={{ accentColor: "#33E6D8" }} onChange={() => setOnsiteWarning(false)} /> Yes
                    </label>
                    <label className={radioLabelClass}>
                      <input type="radio" name="onsite_availability" value="no" style={{ accentColor: "#33E6D8" }} onChange={() => setOnsiteWarning(true)} /> No
                    </label>
                  </div>
                  <FieldError name="onsite_availability" />
                  {onsiteWarning && (
                    <p className="text-[12.5px] leading-relaxed text-[#E15A72]/90 bg-[#E15A72]/10 border-l-[3px] border-[#E15A72] px-3.5 py-2.5 mt-3 rounded-md">This role is currently on-site only.</p>
                  )}
                </fieldset>

                <fieldset className="border-0 p-0 m-0">
                  <legend className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Can you commit to a 3-month paid internship? <span className="text-[#E15A72]">*</span></legend>
                  <div className="flex flex-wrap gap-2.5">
                    <label className={radioLabelClass}>
                      <input type="radio" name="commit_3_months" value="yes" required style={{ accentColor: "#33E6D8" }} /> Yes
                    </label>
                    <label className={radioLabelClass}>
                      <input type="radio" name="commit_3_months" value="no" style={{ accentColor: "#33E6D8" }} /> No
                    </label>
                  </div>
                  <FieldError name="commit_3_months" />
                </fieldset>

                <div>
                  <label htmlFor="joinTimeline" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>When can you join? <span className="text-[#E15A72]">*</span></label>
                  <select id="joinTimeline" name="join_timeline" required className={selectClass} style={{ ...errorBorder("joinTimeline"), backgroundImage: selectBg }}>
                    <option value="" disabled hidden>Select one</option>
                    <option value="immediately">Immediately</option>
                    <option value="within_7_days">Within 7 days</option>
                    <option value="within_15_days">Within 15 days</option>
                    <option value="later_than_15_days">Later than 15 days</option>
                  </select>
                  <FieldError name="joinTimeline" />
                </div>
              </div>
            </section>

            {/* Section C - Developer Links */}
            <section className="py-[clamp(36px,6vw,52px)] border-b border-white/10">
              <header className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-[#33E6D8]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>[ Section C ]</span>
                  <h2 className="font-bold text-white text-[clamp(1.25rem,2.2vw,1.6rem)] m-0" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Developer Links</h2>
                </div>
                <span className="text-xs text-white/25" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>/03</span>
              </header>
              <div className="h-px bg-white/10 mt-4 mb-8"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-6">
                <div className="md:col-span-2">
                  <label htmlFor="githubUrl" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>GitHub Profile URL <span className="text-[#E15A72]">*</span></label>
                  <input type="url" id="githubUrl" name="github_url" placeholder="https://github.com/username" required className={inputClass} style={errorBorder("githubUrl")} />
                  <FieldError name="githubUrl" />
                </div>
                <div>
                  <label htmlFor="portfolioUrl" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Portfolio Website URL</label>
                  <input type="url" id="portfolioUrl" name="portfolio_url" placeholder="https://yourname.dev" className={inputClass} style={errorBorder("portfolioUrl")} />
                  <FieldError name="portfolioUrl" />
                </div>
                <div>
                  <label htmlFor="linkedinUrl" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>LinkedIn Profile URL</label>
                  <input type="url" id="linkedinUrl" name="linkedin_url" placeholder="https://linkedin.com/in/username" className={inputClass} style={errorBorder("linkedinUrl")} />
                  <FieldError name="linkedinUrl" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="deployedUrl" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Best Deployed Project URL <span className="text-[#E15A72]">*</span></label>
                  <input type="url" id="deployedUrl" name="deployed_project_url" placeholder="https://your-project.vercel.app" required className={inputClass} style={errorBorder("deployedUrl")} />
                  <FieldError name="deployedUrl" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="projectRepoUrl" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Best Project GitHub Repository URL</label>
                  <input type="url" id="projectRepoUrl" name="project_repo_url" placeholder="https://github.com/username/project" className={inputClass} style={errorBorder("projectRepoUrl")} />
                  <FieldError name="projectRepoUrl" />
                </div>
              </div>
            </section>

            {/* Section D - Technical Experience */}
            <section className="py-[clamp(36px,6vw,52px)] border-b border-white/10">
              <header className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-[#33E6D8]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>[ Section D ]</span>
                  <h2 className="font-bold text-white text-[clamp(1.25rem,2.2vw,1.6rem)] m-0" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Technical Experience</h2>
                </div>
                <span className="text-xs text-white/25" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>/04</span>
              </header>
              <div className="h-px bg-white/10 mt-4 mb-8"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-6">
                <div className="md:col-span-2">
                  <label htmlFor="nextjsExp" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>How long have you been working with Next.js? <span className="text-[#E15A72]">*</span></label>
                  <select id="nextjsExp" name="nextjs_experience" required className={selectClass} style={{ ...errorBorder("nextjsExp"), backgroundImage: selectBg }}>
                    <option value="" disabled hidden>Select one</option>
                    <option value="lt_1m">Less than 1 month</option>
                    <option value="1_3m">1–3 months</option>
                    <option value="3_6m">3–6 months</option>
                    <option value="6_12m">6–12 months</option>
                    <option value="1y_plus">1 year+</option>
                  </select>
                  <FieldError name="nextjsExp" />
                </div>

                <fieldset className="border-0 p-0 m-0 md:col-span-2">
                  <legend className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Which of these have you worked with? <span className="text-[#E15A72]">*</span></legend>
                  <div id="skillsGrid" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      ["app_router", "Next.js App Router"],
                      ["react_components", "React Components"],
                      ["tailwind", "Tailwind CSS"],
                      ["api_routes", "API Routes / Route Handlers"],
                      ["server_actions", "Server Actions"],
                      ["authentication", "Authentication"],
                      ["rest_apis", "REST APIs"],
                      ["database_integration", "Database Integration"],
                      ["mysql", "MySQL"],
                      ["postgresql", "PostgreSQL"],
                      ["mongodb", "MongoDB"],
                      ["firebase", "Firebase"],
                      ["supabase", "Supabase"],
                      ["git_github", "Git/GitHub"],
                      ["vercel", "Vercel Deployment"],
                      ["ai_tools", "AI tools (ChatGPT, Claude, Copilot)"],
                    ].map(([value, label]) => (
                      <label key={value} className={checkboxLabelClass}>
                        <input type="checkbox" name="skills" value={value} style={{ accentColor: "#33E6D8" }} /> {label}
                      </label>
                    ))}
                  </div>
                  <FieldError name="skills" />
                </fieldset>

                <div>
                  <label htmlFor="backendRating" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Rate your backend understanding <span className="text-[#E15A72]">*</span></label>
                  <select id="backendRating" name="backend_rating" required className={selectClass} style={{ ...errorBorder("backendRating"), backgroundImage: selectBg }}>
                    <option value="" disabled hidden>Select one</option>
                    <option value="beginner">Beginner</option>
                    <option value="basic">Basic</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="strong">Strong</option>
                  </select>
                  <FieldError name="backendRating" />
                </div>
                <div>
                  <label htmlFor="databaseRating" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Rate your database understanding <span className="text-[#E15A72]">*</span></label>
                  <select id="databaseRating" name="database_rating" required className={selectClass} style={{ ...errorBorder("databaseRating"), backgroundImage: selectBg }}>
                    <option value="" disabled hidden>Select one</option>
                    <option value="beginner">Beginner</option>
                    <option value="basic">Basic</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="strong">Strong</option>
                  </select>
                  <FieldError name="databaseRating" />
                </div>
              </div>
            </section>

            {/* Section E - Project Explanation */}
            <section className="py-[clamp(36px,6vw,52px)] border-b border-white/10">
              <header className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-[#33E6D8]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>[ Section E ]</span>
                  <h2 className="font-bold text-white text-[clamp(1.25rem,2.2vw,1.6rem)] m-0" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Project Explanation</h2>
                </div>
                <span className="text-xs text-white/25" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>/05</span>
              </header>
              <p className="text-white/50 text-[0.92rem] mt-1">Tell us about the single project you&apos;re most proud of &mdash; ideally the one linked above.</p>
              <div className="h-px bg-white/10 mt-4 mb-8"></div>

              <div className="grid grid-cols-1 gap-y-6">
                <div>
                  <label htmlFor="projectName" className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Project name <span className="text-[#E15A72]">*</span></label>
                  <input type="text" id="projectName" name="project_name" required className={inputClass} style={errorBorder("projectName")} />
                  <FieldError name="projectName" />
                </div>
                {[
                  ["projectWhat", "project_description", "What does the project do?"],
                  ["projectTech", "project_tech", "What technologies did you use?"],
                  ["projectRole", "project_role", "What was your specific role?"],
                  ["projectHardest", "project_hardest_problem", "What was the hardest problem you solved?"],
                  ["projectImprove", "project_improvement", "What would you improve if you rebuilt it today?"],
                ].map(([id, name, question]) => (
                  <div key={id}>
                    <label htmlFor={id} className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{question} <span className="text-[#E15A72]">*</span></label>
                    <textarea id={id} name={name} rows={3} required className={textareaClass} style={errorBorder(id)} />
                    <FieldError name={id} />
                  </div>
                ))}
              </div>
            </section>

            {/* Section F - Work Style */}
            <section className="py-[clamp(36px,6vw,52px)] border-b border-white/10">
              <header className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-[#33E6D8]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>[ Section F ]</span>
                  <h2 className="font-bold text-white text-[clamp(1.25rem,2.2vw,1.6rem)] m-0" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Work Style</h2>
                </div>
                <span className="text-xs text-white/25" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>/06</span>
              </header>
              <div className="h-px bg-white/10 mt-4 mb-8"></div>

              <div className="grid grid-cols-1 gap-y-6">
                {[
                  ["cleanCode", "clean_code_definition", "What does clean code mean to you?"],
                  ["aiUsage", "ai_tool_usage", "How do you use AI tools while coding?"],
                  ["stuckBug", "stuck_bug_approach", "If you are stuck on a bug for 2 hours, what do you do?"],
                  ["collab", "collaboration_experience", "Have you worked with another developer on the same codebase before? Explain briefly."],
                  ["whyAwtomatig", "why_awtomatig", "Why do you want to join AWTOMATIG?"],
                ].map(([id, name, question]) => (
                  <div key={id}>
                    <label htmlFor={id} className={labelClass} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{question} <span className="text-[#E15A72]">*</span></label>
                    <textarea id={id} name={name} rows={3} required className={textareaClass} style={errorBorder(id)} />
                    <FieldError name={id} />
                  </div>
                ))}
              </div>
            </section>

            {/* Section G - Confirmation */}
            <section className="py-[clamp(36px,6vw,52px)]">
              <header className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-[#33E6D8]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>[ Section G ]</span>
                  <h2 className="font-bold text-white text-[clamp(1.25rem,2.2vw,1.6rem)] m-0" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Confirmation</h2>
                </div>
                <span className="text-xs text-white/25" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>/07</span>
              </header>
              <div className="h-px bg-white/10 mt-4 mb-8"></div>

              <div>
                {[
                  ["confirm_accurate", "I confirm that the information I provided is accurate."],
                  ["confirm_onsite", "I understand this is an on-site internship."],
                  ["confirm_3_months", "I understand this is a 3-month paid internship."],
                  ["confirm_technical_task", "I am willing to complete a short technical task if shortlisted."],
                ].map(([name, text]) => (
                  <label key={name} className="flex items-start gap-2.5 text-[0.92rem] text-white/85 mb-3.5 cursor-pointer">
                    <input type="checkbox" name={name} value="yes" required className="mt-1" style={{ accentColor: "#33E6D8" }} /> {text}
                  </label>
                ))}
                <FieldError name="confirmations" />
              </div>

              <div className="mt-9 flex flex-col items-start gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="text-[13px] font-semibold uppercase tracking-wide text-[#050507] bg-[#33E6D8] px-8 py-4 rounded-full shadow-[0_0_24px_-4px_rgba(51,230,216,0.55)] transition-shadow duration-200 hover:shadow-[0_0_32px_-2px_rgba(51,230,216,0.85)] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                >
                  {submitting ? "Submitting…" : "Submit Application"}
                </button>
                <p className="text-[0.85rem] text-white/40 m-0">By submitting, your responses are reviewed by the AWTOMATIG hiring team.</p>
                {submitError && (
                  <p role="alert" className="w-full text-[12.5px] leading-relaxed text-[#E15A72]/90 bg-[#E15A72]/10 border-l-[3px] border-[#E15A72] px-3.5 py-2.5 mt-1 rounded-md">{submitError}</p>
                )}
              </div>
            </section>

          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-[1152px] mx-auto px-6 sm:px-10 py-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <p className="font-bold text-white text-xl sm:text-2xl leading-tight m-0" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Systems <span className="text-[#33E6D8]">that work.</span><br />Results <span className="text-[#33E6D8]">that last.</span>
          </p>
          <p className="text-[11px] uppercase tracking-wide text-white/35 m-0" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>AWTOMATIG &middot; Full Stack Developer Intern &middot; Recruitment Form</p>
        </div>
        <div className="max-w-[1152px] mx-auto px-6 sm:px-10 pb-8">
          <div className="h-px bg-white/10 mb-5"></div>
          <p className="text-[11px] uppercase tracking-wide text-white/30 m-0" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Copyright &copy; AWTOMATIG 2026. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
