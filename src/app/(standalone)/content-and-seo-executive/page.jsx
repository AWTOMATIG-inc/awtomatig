"use client";

import { useRef, useState } from "react";

const TOTAL_STEPS = 9;
const STEP_TITLES = {
  1: "Basic Information",
  2: "Office Availability",
  3: "Experience Level",
  4: "Content Experience",
  5: "SEO Knowledge",
  6: "AI Workflow Screening",
  7: "Portfolio Validation",
  8: "Writing Assessment",
  9: "Ownership & Accountability",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/[^\s]+\.[^\s]+$/i;
const BD_PHONE_RE = /^(?:\+?880)?01[3-9]\d{8}$/;

const font = { fontFamily: '"Space Grotesk", sans-serif' };

const EXPERIENCE_OPTIONS = [
  "Less than 6 months",
  "6-12 months",
  "1-2 years",
  "2-3 years",
  "3+ years",
];

const SEO_TOOLS = [
  "SEMrush", "Ahrefs", "Google Search Console", "Google Analytics",
  "Screaming Frog", "Surfer SEO", "RankMath", "Yoast",
  "Google Keyword Planner", "WordPress", "None",
];

const AI_TOOLS = [
  "ChatGPT", "Claude", "Gemini", "Perplexity",
  "Jasper", "Writesonic", "Grammarly", "Canva", "None",
];

const YESNO_FIELDS = [
  { key: "writtenForBusinesses", label: "Written content for real businesses before?" },
  { key: "workedAgency", label: "Worked in an agency before?" },
  { key: "writtenBlogs", label: "Written blogs/articles before?" },
  { key: "writtenLandingCopy", label: "Written landing page copy before?" },
  { key: "writtenSocialContent", label: "Written social media content before?" },
  { key: "publishedWordPress", label: "Published content in WordPress before?" },
];

const GRADUATION_OPTIONS = ["Graduated", "Final Year", "In Progress", "Not Applicable"];

const WORD_LIMITS = {
  searchIntent: 200,
  keywordVsTopicVsIntent: 200,
  optimizeBlogPost: 200,
  trafficNoLeads: 200,
  trafficDrop: 200,
  blogWorkflow: 300,
  avoidGeneric: 200,
  factCheck: 200,
  notAutomate: 200,
  bestPieceReason: 150,
  task1Intro: 200,
  task2Rewrite: 100,
  task3LinkedIn: 200,
  task5BlogTopics: 200,
  projectOwned: 300,
  mistakeFix: 300,
  kpiImportance: 200,
  whyJoin: 200,
};

const CHAR_LIMITS = {
  task4MetaTitle: 60,
  task4MetaDescription: 160,
};

function wordCount(text) {
  return (text || "").trim().split(/\s+/).filter(Boolean).length;
}

function WordCounter({ text, field }) {
  const limit = WORD_LIMITS[field];
  if (!limit) return null;
  const count = wordCount(text);
  const over = count > limit;
  return (
    <span className={`text-[0.72rem] ${over ? "text-[#E15A72]" : "text-[#5C5F68]"}`} style={font}>
      {count} / {limit} words
    </span>
  );
}

function CharCounter({ text, field }) {
  const limit = CHAR_LIMITS[field];
  if (!limit) return null;
  const count = (text || "").length;
  const over = count > limit;
  return (
    <span className={`text-[0.72rem] ${over ? "text-[#E15A72]" : "text-[#5C5F68]"}`} style={font}>
      {count} / {limit}
    </span>
  );
}

function FieldError({ error }) {
  if (!error) return null;
  return <p className="text-[0.78rem] text-[#E15A72] mt-1">{error}</p>;
}

function RadioOption({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2.5 text-left text-[0.9rem] rounded-[10px] px-4 py-3 border transition-colors duration-150 ${
        selected
          ? "border-[#33E6D8] bg-[#33E6D8]/8 shadow-[0_0_0_1px_rgba(51,230,216,0.25)]"
          : "border-white/12 bg-[#0E0E14] hover:border-[#33E6D8]/40"
      }`}
    >
      <span
        className={`w-3.5 h-3.5 rounded-full border-[1.5px] shrink-0 ${
          selected ? "bg-[#33E6D8] border-[#33E6D8]" : "border-[#5C5F68]"
        }`}
      />
      <span className="text-white/80">{label}</span>
    </button>
  );
}

function CheckOption({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 text-[0.85rem] rounded-lg px-3 py-2 border transition-colors duration-150 ${
        selected
          ? "border-[#8C5DA0] bg-[#8C5DA0]/12"
          : "border-white/12 bg-[#0E0E14] hover:border-[#8C5DA0]/50"
      }`}
    >
      <span
        className={`w-3.5 h-3.5 rounded shrink-0 border-[1.5px] flex items-center justify-center ${
          selected ? "bg-[#8C5DA0] border-[#8C5DA0]" : "border-[#5C5F68]"
        }`}
      >
        {selected && (
          <svg viewBox="0 0 24 24" fill="none" stroke="#050507" strokeWidth="3" className="w-2.5 h-2.5">
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className="text-white/80">{label}</span>
    </button>
  );
}

function YesNoToggle({ label, value, onChange }) {
  return (
    <div>
      <p className="text-sm text-[#E7E8EC] mb-2" style={font}>{label}</p>
      <div className="grid grid-cols-2 gap-2">
        <RadioOption label="Yes" selected={value === true} onClick={() => onChange(true)} />
        <RadioOption label="No" selected={value === false} onClick={() => onChange(false)} />
      </div>
    </div>
  );
}

function computePriority(data) {
  const officeOk = data.availability.officeAvailable === "Yes";
  const exp = data.basicInfo.totalExperience;
  const experienceOk = exp && exp !== "Less than 6 months";
  const articleLinks = (data.portfolioLinks.articleLinks || []).filter(Boolean);
  const hasArticles = articleLinks.length > 0;

  if (!officeOk || !experienceOk || !hasArticles) return "low_priority";

  let score = 0;

  const expMap = { "6-12 months": 1, "1-2 years": 2, "2-3 years": 3, "3+ years": 3 };
  score += expMap[exp] || 0;

  const ce = data.contentExperience;
  const flagCount = [
    ce.writtenForBusinesses, ce.workedAgency, ce.writtenBlogs,
    ce.writtenLandingCopy, ce.writtenSocialContent, ce.publishedWordPress,
  ].filter(Boolean).length;
  score += flagCount >= 5 ? 3 : flagCount >= 3 ? 2 : flagCount >= 1 ? 1 : 0;

  const seoTools = (data.seoAnswers.tools || []).filter((t) => t !== "None");
  score += seoTools.length >= 5 ? 3 : seoTools.length >= 3 ? 2 : seoTools.length >= 1 ? 1 : 0;

  const aiTools = (data.aiAnswers.toolsUsed || []).filter((t) => t !== "None");
  score += aiTools.length >= 3 ? 2 : aiTools.length >= 1 ? 1 : 0;

  score += Math.min(articleLinks.length, 3);

  if (data.basicInfo.portfolioUrl && URL_RE.test(data.basicInfo.portfolioUrl)) score += 1;

  return score >= 9 ? "high_priority" : "medium_priority";
}

const inputClass =
  "w-full text-[0.92rem] text-[#F1F2F5] bg-[#0E0E14] border border-white/10 rounded-[10px] px-3.5 py-3 placeholder-[#5C5F68] transition-colors duration-150 focus:outline-none focus:border-[#33E6D8] focus:shadow-[0_0_0_3px_rgba(51,230,216,0.12)]";
const textareaClass =
  "w-full text-[0.92rem] text-[#F1F2F5] bg-[#0E0E14] border border-white/10 rounded-[10px] px-3.5 py-3 placeholder-[#5C5F68] resize-y transition-colors duration-150 focus:outline-none focus:border-[#33E6D8] focus:shadow-[0_0_0_3px_rgba(51,230,216,0.12)]";

export default function ContentSeoExecutiveApplication() {
  const wizardRef = useRef(null);
  const [screen, setScreen] = useState("intro");
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [fd, setFd] = useState({
    fullName: "", email: "", phone: "", location: "",
    education: "", graduationStatus: "", currentRole: "",
    joinDate: "", linkedin: "", portfolioUrl: "",
    officeAvailable: "",
    totalExperience: "",
    writtenForBusinesses: null, workedAgency: null, writtenBlogs: null,
    writtenLandingCopy: null, writtenSocialContent: null, publishedWordPress: null,
    articlesPerMonth: "", industries: "",
    searchIntent: "", keywordVsTopicVsIntent: "", optimizeBlogPost: "",
    trafficNoLeads: "", trafficDrop: "",
    seoTools: [],
    aiTools: [],
    blogWorkflow: "", avoidGeneric: "", factCheck: "", notAutomate: "",
    articleLink1: "", articleLink2: "", articleLink3: "",
    bestPieceLink: "", bestPieceReason: "",
    task1Intro: "", task2Rewrite: "", task3LinkedIn: "",
    task4MetaTitle: "", task4MetaDescription: "", task5BlogTopics: "",
    projectOwned: "", mistakeFix: "", kpiImportance: "", whyJoin: "",
  });

  function set(field, value) {
    setFd((prev) => ({ ...prev, [field]: value }));
  }

  function toggleCheck(field, value) {
    setFd((prev) => {
      const arr = prev[field];
      if (value === "None") {
        return { ...prev, [field]: arr.includes("None") ? [] : ["None"] };
      }
      const without = arr.filter((v) => v !== "None");
      return {
        ...prev,
        [field]: without.includes(value) ? without.filter((v) => v !== value) : [...without, value],
      };
    });
  }

  function errorBorder(field) {
    return errors[field] ? { borderColor: "#E15A72", boxShadow: "0 0 0 3px rgba(225,90,114,0.12)" } : {};
  }

  function validateStep(n) {
    const e = {};

    if (n === 1) {
      if (!fd.fullName.trim()) e.fullName = "Full name is required.";
      if (!fd.email.trim() || !EMAIL_RE.test(fd.email.trim())) e.email = "A valid email address is required.";
      if (!fd.phone.trim()) e.phone = "Phone number is required.";
      if (fd.phone.trim() && !BD_PHONE_RE.test(fd.phone.trim().replace(/[\s-]/g, "")))
        e.phone = "Please enter a valid Bangladeshi phone number (e.g., 01712345678 or +8801712345678).";
      if (!fd.location.trim()) e.location = "Current location is required.";
      if (!fd.currentRole.trim()) e.currentRole = "Current role is required.";
      if (!fd.joinDate) e.joinDate = "Please select a join date.";
      if (fd.linkedin && !URL_RE.test(fd.linkedin)) e.linkedin = "Enter a valid URL.";
      if (fd.portfolioUrl && !URL_RE.test(fd.portfolioUrl)) e.portfolioUrl = "Enter a valid URL.";
    }

    if (n === 2) {
      if (!fd.officeAvailable) e.officeAvailable = "Please confirm office availability.";
    }

    if (n === 3) {
      if (!fd.totalExperience) e.totalExperience = "Total experience is required.";
    }

    if (n === 5) {
      if (!fd.searchIntent.trim()) e.searchIntent = "Please answer the search intent question.";
      if (!fd.keywordVsTopicVsIntent.trim()) e.keywordVsTopicVsIntent = "Please answer the keyword/topic/intent question.";
      if (!fd.optimizeBlogPost.trim()) e.optimizeBlogPost = "Please answer the keyword mapping question.";
      if (!fd.trafficNoLeads.trim()) e.trafficNoLeads = "Please answer the traffic-without-leads question.";
      if (!fd.trafficDrop.trim()) e.trafficDrop = "Please answer the on-page vs off-page question.";
    }

    if (n === 6) {
      if (!fd.blogWorkflow.trim()) e.blogWorkflow = "Please describe your AI blog-writing workflow.";
      if (!fd.avoidGeneric.trim()) e.avoidGeneric = "Please answer how you avoid generic AI output.";
      if (!fd.factCheck.trim()) e.factCheck = "Please answer how you fact-check content.";
      if (!fd.notAutomate.trim()) e.notAutomate = "Please answer what should not be fully automated.";
    }

    if (n === 8) {
      if (!fd.task1Intro.trim()) e.task1Intro = "Task 1 (introduction) is required.";
      if (!fd.task2Rewrite.trim()) e.task2Rewrite = "Task 2 (rewrite) is required.";
      if (!fd.task3LinkedIn.trim()) e.task3LinkedIn = "Task 3 (LinkedIn post) is required.";
      if (!fd.task4MetaTitle.trim()) e.task4MetaTitle = "Task 4 (meta title) is required.";
      if (!fd.task4MetaDescription.trim()) e.task4MetaDescription = "Task 4 (meta description) is required.";
      if (!fd.task5BlogTopics.trim()) e.task5BlogTopics = "Task 5 (blog topic ideas) is required.";
    }

    if (n === 9) {
      if (!fd.projectOwned.trim()) e.projectOwned = "Please describe a project you owned.";
      if (!fd.mistakeFix.trim()) e.mistakeFix = "Please describe a mistake and how you fixed it.";
      if (!fd.kpiImportance.trim()) e.kpiImportance = "Please answer the KPI question.";
      if (!fd.whyJoin.trim()) e.whyJoin = "Please tell us why you want to join AWTOMATIG.";
    }

    return e;
  }

  function handleNext() {
    const stepErrors = validateStep(currentStep);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
      wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    handleSubmit();
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function buildPayload() {
    const payload = {
      basicInfo: {
        fullName: fd.fullName.trim(),
        email: fd.email.trim().toLowerCase(),
        phone: fd.phone.trim(),
        location: fd.location.trim(),
        education: fd.education.trim(),
        graduationStatus: fd.graduationStatus,
        currentRole: fd.currentRole.trim(),
        totalExperience: fd.totalExperience,
        joinDate: fd.joinDate,
        linkedin: fd.linkedin.trim(),
        portfolioUrl: fd.portfolioUrl.trim(),
      },
      availability: {
        officeAvailable: fd.officeAvailable,
      },
      contentExperience: {
        writtenForBusinesses: !!fd.writtenForBusinesses,
        workedAgency: !!fd.workedAgency,
        writtenBlogs: !!fd.writtenBlogs,
        writtenLandingCopy: !!fd.writtenLandingCopy,
        writtenSocialContent: !!fd.writtenSocialContent,
        publishedWordPress: !!fd.publishedWordPress,
        articlesPerMonth: fd.articlesPerMonth.trim(),
        industries: fd.industries.trim(),
      },
      seoAnswers: {
        searchIntent: fd.searchIntent.trim(),
        keywordVsTopicVsIntent: fd.keywordVsTopicVsIntent.trim(),
        optimizeBlogPost: fd.optimizeBlogPost.trim(),
        trafficNoLeads: fd.trafficNoLeads.trim(),
        trafficDrop: fd.trafficDrop.trim(),
        tools: fd.seoTools,
      },
      aiAnswers: {
        toolsUsed: fd.aiTools,
        blogWorkflow: fd.blogWorkflow.trim(),
        avoidGeneric: fd.avoidGeneric.trim(),
        factCheck: fd.factCheck.trim(),
        notAutomate: fd.notAutomate.trim(),
      },
      portfolioLinks: {
        portfolioUrl: fd.portfolioUrl.trim(),
        articleLinks: [fd.articleLink1, fd.articleLink2, fd.articleLink3].map((l) => l.trim()).filter(Boolean),
        bestPieceLink: fd.bestPieceLink.trim(),
        bestPieceReason: fd.bestPieceReason.trim(),
      },
      writingAssessment: {
        task1Intro: fd.task1Intro.trim(),
        task2Rewrite: fd.task2Rewrite.trim(),
        task3LinkedIn: fd.task3LinkedIn.trim(),
        task4MetaTitle: fd.task4MetaTitle.trim(),
        task4MetaDescription: fd.task4MetaDescription.trim(),
        task5BlogTopics: fd.task5BlogTopics.trim(),
      },
      ownershipAnswers: {
        projectOwned: fd.projectOwned.trim(),
        mistakeFix: fd.mistakeFix.trim(),
        kpiImportance: fd.kpiImportance.trim(),
        whyJoin: fd.whyJoin.trim(),
      },
    };
    payload.priority = computePriority(payload);
    return payload;
  }

  async function handleSubmit() {
    setFormError("");
    setSubmitting(true);

    const payload = buildPayload();

    try {
      const res = await fetch("/api/recruitment/content-and-seo-executive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({}));

      if (res.status === 409) {
        throw new Error(result.message || "An application with this email already exists.");
      }
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Application submission failed.");
      }

      setScreen("success");
      window.scrollTo(0, 0);
    } catch (err) {
      setFormError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const progressWidth = ((currentStep / TOTAL_STEPS) * 100) + "%";

  function Label({ required, children, optional }) {
    return (
      <label className="block text-sm text-[#E7E8EC] mb-1.5" style={font}>
        {children}
        {required && <span className="text-[#E15A72]"> *</span>}
        {optional && <span className="text-[0.65rem] tracking-[0.08em] uppercase text-[#8C5DA0] border border-[#8C5DA0]/40 rounded-full px-2 py-0.5 ml-2" style={font}>Optional</span>}
      </label>
    );
  }

  if (screen === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(140,93,160,0.16), transparent), radial-gradient(ellipse 60% 40% at 90% 10%, rgba(51,230,216,0.08), transparent), #050507", fontFamily: "Inter, sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');`}</style>
        <div className="max-w-xl text-center py-20">
          <p className="text-[0.72rem] tracking-[0.12em] uppercase text-[#33E6D8] mb-4" style={font}>
            <span className="text-[#1C8A81]">[ </span>Application Received<span className="text-[#1C8A81]"> ]</span>
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={font}>Thanks — we&apos;ve got it.</h1>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Your application for Content &amp; SEO Executive has been submitted. Our team will review it and reach out if there&apos;s a fit.
          </p>
          <p className="text-zinc-600 text-xs tracking-wide" style={font}>Systems that work. Results that last.</p>
        </div>
      </div>
    );
  }

  if (screen === "intro") {
    return (
      <div className="min-h-screen text-zinc-200" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(140,93,160,0.16), transparent), radial-gradient(ellipse 60% 40% at 90% 10%, rgba(51,230,216,0.08), transparent), #050507", fontFamily: "Inter, sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');`}</style>

        <header className="border-b border-white/5">
          <div className="max-w-3xl mx-auto px-5 py-5 flex items-center justify-between">
            <div>
              <div className="font-bold text-lg tracking-tight text-white" style={font}>AWTOMATIG</div>
              <div className="text-[0.7rem] text-zinc-500 tracking-wide">Systems that work. Results that last.</div>
            </div>
            <p className="text-[0.72rem] tracking-[0.12em] uppercase text-[#33E6D8]" style={font}>
              <span className="text-[#1C8A81]">[ </span>Careers<span className="text-[#1C8A81]"> ]</span>
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-5 py-16">
          <p className="text-[0.72rem] tracking-[0.12em] uppercase text-[#33E6D8] mb-4" style={font}>
            <span className="text-[#1C8A81]">[ </span>Open Role<span className="text-[#1C8A81]"> ]</span>
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4" style={font}>Content &amp; SEO Executive</h1>
          <p className="text-zinc-400 leading-relaxed mb-8 max-w-xl">
            Full-time, on-site. We&apos;re looking for someone with practical content and SEO experience — ideally around
            a year of real work — who can write for businesses, think in search intent, and use AI tools without
            leaning on them to think for you.
          </p>

          <div className="rounded-[14px] border border-[#33E6D8]/18 p-6 mb-8" style={{ background: "linear-gradient(180deg, #0B0B10 0%, #0A0A0E 100%)", boxShadow: "0 0 0 1px rgba(255,255,255,0.02) inset, 0 20px 60px -30px rgba(51,230,216,0.25)" }}>
            <p className="text-[0.72rem] tracking-[0.12em] uppercase text-[#33E6D8] mb-3" style={font}>
              <span className="text-[#1C8A81]">[ </span>Before You Start<span className="text-[#1C8A81]"> ]</span>
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              <li className="flex gap-3"><span className="text-[#33E6D8] mt-0.5">—</span>This application takes roughly 30–45 minutes and includes a short writing assessment.</li>
              <li className="flex gap-3"><span className="text-[#33E6D8] mt-0.5">—</span>Have links to at least 3 published pieces of writing or content if you can.</li>
              <li className="flex gap-3"><span className="text-[#33E6D8] mt-0.5">—</span>This role requires full-time, on-site work — please confirm you can commit to that before applying.</li>
              <li className="flex gap-3"><span className="text-[#33E6D8] mt-0.5">—</span>Your progress is not saved between sessions, so set aside time to finish in one sitting.</li>
            </ul>
          </div>

          <button
            onClick={() => { setScreen("wizard"); window.scrollTo(0, 0); }}
            className="font-semibold rounded-full px-8 py-3.5 text-[#050507] bg-[#33E6D8] shadow-[0_0_30px_-8px_rgba(51,230,216,0.6)] hover:shadow-[0_0_40px_-6px_rgba(51,230,216,0.75)] hover:-translate-y-px active:translate-y-0 transition-all duration-150"
            style={font}
          >
            Begin Application →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-zinc-200" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(140,93,160,0.16), transparent), radial-gradient(ellipse 60% 40% at 90% 10%, rgba(51,230,216,0.08), transparent), #050507", fontFamily: "Inter, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap'); input[type="date"] { color-scheme: dark; }`}</style>

      <header className="border-b border-white/5">
        <div className="max-w-3xl mx-auto px-5 py-5 flex items-center justify-between">
          <div>
            <div className="font-bold text-lg tracking-tight text-white" style={font}>AWTOMATIG</div>
            <div className="text-[0.7rem] text-zinc-500 tracking-wide">Systems that work. Results that last.</div>
          </div>
          <p className="text-[0.72rem] tracking-[0.12em] uppercase text-[#33E6D8]" style={font}>
            <span className="text-[#1C8A81]">[ </span>Careers<span className="text-[#1C8A81]"> ]</span>
          </p>
        </div>
      </header>

      <div ref={wizardRef} className="max-w-3xl mx-auto px-5 py-10">

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[0.72rem] tracking-[0.12em] uppercase text-[#33E6D8]" style={font}>
              <span className="text-[#1C8A81]">[ </span>{STEP_TITLES[currentStep]}<span className="text-[#1C8A81]"> ]</span>
            </p>
            <p className="text-xs text-zinc-500" style={font}>{String(currentStep).padStart(2, "0")} / {String(TOTAL_STEPS).padStart(2, "0")}</p>
          </div>
          <div className="h-1 rounded-full bg-white/8 overflow-hidden">
            <div className="h-full transition-[width] duration-300" style={{ width: progressWidth, background: "linear-gradient(90deg, #33E6D8, #8C5DA0)" }} />
          </div>
        </div>

        {/* Form error */}
        {formError && (
          <div className="rounded-[14px] border border-[#E15A72]/40 p-4 mb-6 text-sm text-[#E15A72]" style={{ background: "linear-gradient(180deg, #0B0B10 0%, #0A0A0E 100%)" }} role="alert">{formError}</div>
        )}

        {/* ===================== STEP 1 ===================== */}
        {currentStep === 1 && (
          <div>
            <p className="text-3xl font-semibold text-[#33E6D8] mb-1" style={font}>/01</p>
            <h2 className="text-xl font-semibold text-white mb-1" style={font}>Basic Information</h2>
            <p className="text-zinc-500 text-sm mb-6">Tell us who you are and where you&apos;re at right now.</p>

            <div className="space-y-5">
              <div>
                <Label required>Full name</Label>
                <input type="text" value={fd.fullName} onChange={(e) => set("fullName", e.target.value)} className={inputClass} style={errorBorder("fullName")} autoComplete="name" placeholder="Jane Doe" />
                <FieldError error={errors.fullName} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label required>Email</Label>
                  <input type="email" value={fd.email} onChange={(e) => set("email", e.target.value)} className={inputClass} style={errorBorder("email")} autoComplete="email" placeholder="jane@example.com" />
                  <FieldError error={errors.email} />
                </div>
                <div>
                  <Label required>Phone</Label>
                  <input type="tel" value={fd.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} style={errorBorder("phone")} autoComplete="tel" placeholder="+880 1XXXXXXXXX" />
                  <FieldError error={errors.phone} />
                </div>
              </div>
              <div>
                <Label required>Current location</Label>
                <input type="text" value={fd.location} onChange={(e) => set("location", e.target.value)} className={inputClass} style={errorBorder("location")} placeholder="City, Country" />
                <FieldError error={errors.location} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label optional>Educational background</Label>
                  <input type="text" value={fd.education} onChange={(e) => set("education", e.target.value)} className={inputClass} placeholder="e.g. BA in English, XYZ University" />
                </div>
                <div>
                  <Label optional>Graduation status</Label>
                  <select value={fd.graduationStatus} onChange={(e) => set("graduationStatus", e.target.value)} className={inputClass} style={{ ...errorBorder("graduationStatus"), appearance: "none", height: "2.85rem", backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2333E6D8' stroke-width='2'%3e%3cpath d='M6 9l6 6 6-6'/%3e%3c/svg%3e")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.8rem center", backgroundSize: "1.1rem", paddingRight: "2.4rem" }}>
                    <option value="">Select…</option>
                    {GRADUATION_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <Label required>Current role</Label>
                <input type="text" value={fd.currentRole} onChange={(e) => set("currentRole", e.target.value)} className={inputClass} style={errorBorder("currentRole")} placeholder="e.g. Content Writer at XYZ Agency, or Student" />
                <FieldError error={errors.currentRole} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label required>When can you join?</Label>
                  <input type="date" value={fd.joinDate} onChange={(e) => set("joinDate", e.target.value)} className={inputClass} style={errorBorder("joinDate")} />
                  <FieldError error={errors.joinDate} />
                </div>
                <div>
                  <Label optional>LinkedIn profile</Label>
                  <input type="url" value={fd.linkedin} onChange={(e) => set("linkedin", e.target.value)} className={inputClass} style={errorBorder("linkedin")} placeholder="linkedin.com/in/you" />
                  <FieldError error={errors.linkedin} />
                </div>
              </div>
              <div>
                <Label optional>Portfolio website or Google Drive link</Label>
                <input type="url" value={fd.portfolioUrl} onChange={(e) => set("portfolioUrl", e.target.value)} className={inputClass} style={errorBorder("portfolioUrl")} placeholder="https://…" />
                <p className="text-[#8A8D96] text-[0.8rem] mt-1.5">You&apos;ll have a chance to add specific article links later — this can be your general portfolio hub.</p>
                <FieldError error={errors.portfolioUrl} />
              </div>
            </div>
          </div>
        )}

        {/* ===================== STEP 2 ===================== */}
        {currentStep === 2 && (
          <div>
            <p className="text-3xl font-semibold text-[#33E6D8] mb-1" style={font}>/02</p>
            <h2 className="text-xl font-semibold text-white mb-1" style={font}>Office Availability</h2>
            <p className="text-zinc-500 text-sm mb-6">This role is full-time and on-site. Be honest here — it saves everyone time.</p>

            <div>
              <Label required>Can you work full-time from our office?</Label>
              <div className="grid grid-cols-2 gap-3 mt-2.5">
                <RadioOption label="Yes" selected={fd.officeAvailable === "Yes"} onClick={() => set("officeAvailable", "Yes")} />
                <RadioOption label="No" selected={fd.officeAvailable === "No"} onClick={() => set("officeAvailable", "No")} />
              </div>
              <FieldError error={errors.officeAvailable} />
            </div>
          </div>
        )}

        {/* ===================== STEP 3 ===================== */}
        {currentStep === 3 && (
          <div>
            <p className="text-3xl font-semibold text-[#33E6D8] mb-1" style={font}>/03</p>
            <h2 className="text-xl font-semibold text-white mb-1" style={font}>Experience Level</h2>
            <p className="text-zinc-500 text-sm mb-6">Total real-world content/SEO experience — not coursework.</p>

            <div className="space-y-3">
              {EXPERIENCE_OPTIONS.map((opt) => (
                <RadioOption key={opt} label={opt} selected={fd.totalExperience === opt} onClick={() => set("totalExperience", opt)} />
              ))}
            </div>
            <FieldError error={errors.totalExperience} />
          </div>
        )}

        {/* ===================== STEP 4 ===================== */}
        {currentStep === 4 && (
          <div>
            <p className="text-3xl font-semibold text-[#33E6D8] mb-1" style={font}>/04</p>
            <h2 className="text-xl font-semibold text-white mb-1" style={font}>Content Experience</h2>
            <p className="text-zinc-500 text-sm mb-6">A quick picture of what you&apos;ve actually written and shipped.</p>

            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              {YESNO_FIELDS.map(({ key, label }) => (
                <YesNoToggle key={key} label={label} value={fd[key]} onChange={(val) => set(key, val)} />
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label optional>Articles you usually write per month</Label>
                <input type="text" value={fd.articlesPerMonth} onChange={(e) => set("articlesPerMonth", e.target.value)} className={inputClass} placeholder="e.g. 8" />
              </div>
              <div>
                <Label optional>Industries you&apos;ve written for</Label>
                <input type="text" value={fd.industries} onChange={(e) => set("industries", e.target.value)} className={inputClass} placeholder="e.g. SaaS, healthcare, ecommerce" />
              </div>
            </div>
          </div>
        )}

        {/* ===================== STEP 5 ===================== */}
        {currentStep === 5 && (
          <div>
            <p className="text-3xl font-semibold text-[#33E6D8] mb-1" style={font}>/05</p>
            <h2 className="text-xl font-semibold text-white mb-1" style={font}>SEO Knowledge</h2>
            <p className="text-zinc-500 text-sm mb-6">Answer in your own words — specificity matters more than length.</p>

            <div className="space-y-5">
              {[
                ["searchIntent", "Explain search intent in your own words."],
                ["keywordVsTopicVsIntent", "What is the difference between keyword, topic, search intent, and conversion intent?"],
                ["optimizeBlogPost", "How do you decide which pages on a site should target which keywords?"],
                ["trafficNoLeads", "If a blog gets traffic but no leads, what would you change?"],
                ["trafficDrop", "What's the difference between on-page SEO and off-page SEO? Give an example of each."],
              ].map(([key, question]) => (
                <div key={key}>
                  <Label required>{question}</Label>
                  <textarea rows={3} value={fd[key]} onChange={(e) => set(key, e.target.value)} className={textareaClass} style={errorBorder(key)} />
                  <div className="flex justify-between mt-1">
                    <FieldError error={errors[key]} />
                    <WordCounter text={fd[key]} field={key} />
                  </div>
                </div>
              ))}

              <div>
                <Label optional>SEO tools you&apos;ve used</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SEO_TOOLS.map((tool) => (
                    <CheckOption key={tool} label={tool} selected={fd.seoTools.includes(tool)} onClick={() => toggleCheck("seoTools", tool)} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== STEP 6 ===================== */}
        {currentStep === 6 && (
          <div>
            <p className="text-3xl font-semibold text-[#33E6D8] mb-1" style={font}>/06</p>
            <h2 className="text-xl font-semibold text-white mb-1" style={font}>AI Workflow Screening</h2>
            <p className="text-zinc-500 text-sm mb-6">We use AI tools daily. We just need someone who uses them with judgement.</p>

            <div className="space-y-5">
              <div>
                <Label optional>Which AI tools do you use weekly?</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {AI_TOOLS.map((tool) => (
                    <CheckOption key={tool} label={tool} selected={fd.aiTools.includes(tool)} onClick={() => toggleCheck("aiTools", tool)} />
                  ))}
                </div>
              </div>

              {[
                ["blogWorkflow", "Describe your exact workflow for writing a blog using AI.", 4],
                ["avoidGeneric", "How do you make sure AI-generated content does not sound generic?", 3],
                ["factCheck", "How do you verify facts before publishing content?", 3],
                ["notAutomate", "What part of content writing should not be fully automated?", 3],
              ].map(([key, question, rows]) => (
                <div key={key}>
                  <Label required>{question}</Label>
                  <textarea rows={rows} value={fd[key]} onChange={(e) => set(key, e.target.value)} className={textareaClass} style={errorBorder(key)} />
                  <div className="flex justify-between mt-1">
                    <FieldError error={errors[key]} />
                    <WordCounter text={fd[key]} field={key} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== STEP 7 ===================== */}
        {currentStep === 7 && (
          <div>
            <p className="text-3xl font-semibold text-[#33E6D8] mb-1" style={font}>/07</p>
            <h2 className="text-xl font-semibold text-white mb-1" style={font}>Portfolio Validation</h2>
            <p className="text-zinc-500 text-sm mb-6">Real, published work matters far more than a polished resume here.</p>

            <div className="space-y-5">
              <div>
                <Label optional>Published article/content links <span className="text-[0.65rem] tracking-[0.08em] uppercase text-[#8C5DA0] border border-[#8C5DA0]/40 rounded-full px-2 py-0.5 ml-2" style={font}>Minimum 2 recommended</span></Label>
                <div className="space-y-2.5">
                  <input type="url" value={fd.articleLink1} onChange={(e) => set("articleLink1", e.target.value)} className={inputClass} placeholder="Article link 1" />
                  <input type="url" value={fd.articleLink2} onChange={(e) => set("articleLink2", e.target.value)} className={inputClass} placeholder="Article link 2" />
                  <input type="url" value={fd.articleLink3} onChange={(e) => set("articleLink3", e.target.value)} className={inputClass} placeholder="Article link 3" />
                </div>
              </div>
              <div>
                <Label optional>Your best piece of writing</Label>
                <input type="url" value={fd.bestPieceLink} onChange={(e) => set("bestPieceLink", e.target.value)} className={inputClass} placeholder="Link to your strongest piece" />
              </div>
              <div>
                <Label optional>Why is this your best piece?</Label>
                <textarea rows={3} value={fd.bestPieceReason} onChange={(e) => set("bestPieceReason", e.target.value)} className={textareaClass} />
                <div className="flex justify-end mt-1">
                  <WordCounter text={fd.bestPieceReason} field="bestPieceReason" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== STEP 8 ===================== */}
        {currentStep === 8 && (
          <div>
            <p className="text-3xl font-semibold text-[#33E6D8] mb-1" style={font}>/08</p>
            <h2 className="text-xl font-semibold text-white mb-1" style={font}>Writing Assessment</h2>
            <p className="text-zinc-500 text-sm mb-6">This is the part that matters most. Take your time.</p>

            <div className="space-y-7">
              <div>
                <Label required>Task 1 — Write a 150-word introduction for: <span className="text-[#33E6D8]">&quot;Why Businesses Need SEO in 2026&quot;</span></Label>
                <textarea rows={5} value={fd.task1Intro} onChange={(e) => set("task1Intro", e.target.value)} className={textareaClass} style={errorBorder("task1Intro")} />
                <div className="flex justify-between mt-1">
                  <FieldError error={errors.task1Intro} />
                  <WordCounter text={fd.task1Intro} field="task1Intro" />
                </div>
              </div>
              <div>
                <Label required>Task 2 — Rewrite this sentence professionally: <span className="italic text-zinc-400">&quot;We build websites and help businesses grow online.&quot;</span></Label>
                <textarea rows={2} value={fd.task2Rewrite} onChange={(e) => set("task2Rewrite", e.target.value)} className={textareaClass} style={errorBorder("task2Rewrite")} />
                <div className="flex justify-between mt-1">
                  <FieldError error={errors.task2Rewrite} />
                  <WordCounter text={fd.task2Rewrite} field="task2Rewrite" />
                </div>
              </div>
              <div>
                <Label required>Task 3 — Write a LinkedIn post promoting a commercial cleaning company. Maximum 200 words.</Label>
                <textarea rows={6} value={fd.task3LinkedIn} onChange={(e) => set("task3LinkedIn", e.target.value)} className={textareaClass} style={errorBorder("task3LinkedIn")} />
                <div className="flex justify-between mt-1">
                  <FieldError error={errors.task3LinkedIn} />
                  <WordCounter text={fd.task3LinkedIn} field="task3LinkedIn" />
                </div>
              </div>
              <div>
                <Label required>Task 4 — Create a meta title and meta description for: <span className="text-[#33E6D8]">&quot;Best Digital Marketing Agency in London&quot;</span></Label>
                <input type="text" value={fd.task4MetaTitle} onChange={(e) => set("task4MetaTitle", e.target.value)} className={inputClass} style={errorBorder("task4MetaTitle")} placeholder="Meta title (~50–60 characters)" />
                <div className="flex justify-end mb-2 mt-1">
                  <CharCounter text={fd.task4MetaTitle} field="task4MetaTitle" />
                </div>
                <FieldError error={errors.task4MetaTitle} />
                <textarea rows={2} value={fd.task4MetaDescription} onChange={(e) => set("task4MetaDescription", e.target.value)} className={textareaClass} style={errorBorder("task4MetaDescription")} placeholder="Meta description (~150–160 characters)" />
                <div className="flex justify-between mt-1">
                  <FieldError error={errors.task4MetaDescription} />
                  <CharCounter text={fd.task4MetaDescription} field="task4MetaDescription" />
                </div>
              </div>
              <div>
                <Label required>Task 5 — Create 5 blog topic ideas for a cleaning company targeting NYC businesses.</Label>
                <textarea rows={5} value={fd.task5BlogTopics} onChange={(e) => set("task5BlogTopics", e.target.value)} className={textareaClass} style={errorBorder("task5BlogTopics")} placeholder={"1.\n2.\n3.\n4.\n5."} />
                <div className="flex justify-between mt-1">
                  <FieldError error={errors.task5BlogTopics} />
                  <WordCounter text={fd.task5BlogTopics} field="task5BlogTopics" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== STEP 9 ===================== */}
        {currentStep === 9 && (
          <div>
            <p className="text-3xl font-semibold text-[#33E6D8] mb-1" style={font}>/09</p>
            <h2 className="text-xl font-semibold text-white mb-1" style={font}>Ownership &amp; Accountability</h2>
            <p className="text-zinc-500 text-sm mb-6">Last section. Then you&apos;re done.</p>

            <div className="space-y-5">
              {[
                ["projectOwned", "Describe one content project you owned from start to finish.", 4],
                ["mistakeFix", "Describe one mistake you made in a content/SEO project and how you fixed it.", 4],
                ["kpiImportance", "Which KPI matters most for content: traffic, leads, or revenue? Explain.", 3],
                ["whyJoin", "Why do you want to join AWTOMATIG?", 3],
              ].map(([key, question, rows]) => (
                <div key={key}>
                  <Label required>{question}</Label>
                  <textarea rows={rows} value={fd[key]} onChange={(e) => set(key, e.target.value)} className={textareaClass} style={errorBorder(key)} />
                  <div className="flex justify-between mt-1">
                    <FieldError error={errors[key]} />
                    <WordCounter text={fd[key]} field={key} />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[14px] border border-[#33E6D8]/18 p-4 mt-7 text-xs text-zinc-500" style={{ background: "linear-gradient(180deg, #0B0B10 0%, #0A0A0E 100%)" }}>
              By submitting, you confirm the information and writing in this application are your own.
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="font-semibold rounded-full px-8 py-3.5 text-[#33E6D8] border border-[#33E6D8]/40 bg-transparent hover:border-[#33E6D8] hover:bg-[#33E6D8]/6 transition-all duration-150"
              style={font}
            >
              ← Back
            </button>
          ) : <div />}

          <button
            type="button"
            onClick={handleNext}
            disabled={submitting}
            className="font-semibold rounded-full px-8 py-3.5 text-[#050507] bg-[#33E6D8] shadow-[0_0_30px_-8px_rgba(51,230,216,0.6)] hover:shadow-[0_0_40px_-6px_rgba(51,230,216,0.75)] hover:-translate-y-px active:translate-y-0 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            style={font}
          >
            {submitting ? "Submitting…" : currentStep === TOTAL_STEPS ? "Submit Application" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
