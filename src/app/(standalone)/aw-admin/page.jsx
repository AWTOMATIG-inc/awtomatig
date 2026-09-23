"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Menu,
  Plus,
  RefreshCw,
  Loader2,
  AlertCircle,
  ChevronLeft,
} from "lucide-react";

import { useDebounce } from "./hooks/useDebounce";
import SidebarNav from "./components/SidebarNav";
import OverviewSection from "./components/OverviewSection";
import CandidatePipelineSection from "./components/CandidatePipelineSection";
import CandidateDrawer from "./components/CandidateDrawer";
import JobOpeningsSection from "./components/JobOpeningsSection";
import JobModal from "./components/JobModal";
import ContactLeadsSection from "./components/ContactLeadsSection";
import SettingsSection from "./components/SettingsSection";
import AnalyticsSection from "./components/AnalyticsSection";
import ConfirmModal from "./components/ConfirmModal";
import ToastContainer from "./components/Toast";

const STAGES = [
  { key: "APPLIED", label: "Applied", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { key: "SCREENING", label: "Screening", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { key: "INTERVIEW", label: "Interview", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { key: "OFFER", label: "Offer", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { key: "HIRED", label: "Hired", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { key: "REJECTED", label: "Rejected", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
];

function AdminDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL parameters synchronization
  const activeTabParam = searchParams.get("tab") || "pipeline";
  const candidateParam = searchParams.get("candidate") || null;

  const [currentUser, setCurrentUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Mobile sidebar toggle
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Desktop sidebar collapse toggle with persistence
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aw_admin_sidebar_collapsed");
      if (saved !== null) {
        setDesktopCollapsed(saved === "true");
      }
    } catch {}
  }, []);

  const handleToggleDesktopCollapse = () => {
    setDesktopCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("aw_admin_sidebar_collapsed", String(next));
      } catch {}
      return next;
    });
  };

  // Jobs State
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState("all");

  // Candidate Applications State
  const [applications, setApplications] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);

  // Candidate Detail Drawer State
  const [candidateDetail, setCandidateDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [noteSubmitting, setNoteSubmitting] = useState(false);

  // Job Modal State (Create & Edit)
  const [showJobModal, setShowJobModal] = useState(false);
  const [jobModalMode, setJobModalMode] = useState("create");
  const [editingJobId, setEditingJobId] = useState(null);
  const [jobSubmitting, setJobSubmitting] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: "",
    slug: "",
    department: "Engineering",
    type: "FULL_TIME",
    workMode: "On-site",
    location: "Dhaka, Bangladesh",
    salary: "Negotiable",
    summary: "",
    descriptionMarkdown: "",
    requirements: "",
    benefits: "",
    status: "PUBLISHED",
  });

  // Contact Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [inquiriesSummary, setInquiriesSummary] = useState({});
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");
  const [inquiryPage, setInquiryPage] = useState(1);
  const [inquiryTotalPages, setInquiryTotalPages] = useState(1);
  const [inquiryTotalCount, setInquiryTotalCount] = useState(0);

  // Settings State
  const [settingsForm, setSettingsForm] = useState({
    fullName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsStatus, setSettingsStatus] = useState(null);

  // Styled Confirmation Modal
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    loading: false,
  });

  // Cyber-minimal Toast Notifications State
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success", title = "") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev.slice(-3), { id, message, type, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const handleDismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Centralized Session Check
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (res.ok && data.success && data.user) {
        setCurrentUser(data.user);
      } else {
        setCurrentUser(null);
      }
    } catch {
      setCurrentUser(null);
    } finally {
      setAuthChecking(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Handle 401 Session Expiration
  const handleAuthError = useCallback(() => {
    setCurrentUser(null);
    setLoginError("Your session has expired. Please sign in again.");
  }, []);

  // Update URL Query Parameters
  const updateUrlParams = useCallback((paramsObj) => {
    const current = new URLSearchParams(searchParams.toString());
    Object.entries(paramsObj).forEach(([k, v]) => {
      if (v === null || v === undefined) {
        current.delete(k);
      } else {
        current.set(k, v);
      }
    });
    router.push(`/aw-admin?${current.toString()}`, { scroll: false });
  }, [router, searchParams]);

  // Section Tab Navigation
  function handleSelectSection(section) {
    updateUrlParams({ tab: section, candidate: null });
    setMobileSidebarOpen(false);
  }

  // Sync settings form when user loads
  useEffect(() => {
    if (currentUser) {
      setSettingsForm((prev) => ({
        ...prev,
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
      }));
    }
  }, [currentUser]);

  // Handle Login
  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials.");
      }

      setCurrentUser(data.user);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  }

  // Handle Logout
  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setCurrentUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  // Fetch Jobs List
  const fetchJobs = useCallback(async () => {
    if (!currentUser) return;
    setJobsLoading(true);
    try {
      const res = await fetch("/api/admin/jobs", { cache: "no-store" });
      if (res.status === 401) {
        handleAuthError();
        return;
      }
      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs || []);
      }
    } catch (err) {
      console.error("Failed to load jobs:", err);
    } finally {
      setJobsLoading(false);
    }
  }, [currentUser, handleAuthError]);

  // Fetch Candidate Applications with Debounced Search
  const fetchApplications = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (selectedJob !== "all") query.set("jobSlug", selectedJob);
      if (stageFilter !== "all") query.set("stage", stageFilter);
      if (priorityFilter !== "all") query.set("priority", priorityFilter);
      if (debouncedSearch.trim()) query.set("search", debouncedSearch.trim());
      query.set("page", String(currentPage));
      query.set("limit", "25");

      const res = await fetch(`/api/admin/applications?${query.toString()}`, { cache: "no-store" });
      if (res.status === 401) {
        handleAuthError();
        return;
      }
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications || []);
        if (data.summary) setSummary(data.summary);
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages || 1);
          setTotalApplications(data.pagination.totalCount || 0);
        }
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  }, [currentUser, selectedJob, stageFilter, priorityFilter, debouncedSearch, currentPage, handleAuthError]);

  // Reset page to 1 when filters or debounced search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedJob, stageFilter, priorityFilter, debouncedSearch]);

  // Fetch Inbound Contact Inquiries
  const fetchInquiries = useCallback(async () => {
    if (!currentUser) return;
    setInquiriesLoading(true);
    try {
      const query = new URLSearchParams();
      if (inquiryStatusFilter !== "all") query.set("status", inquiryStatusFilter);
      query.set("page", String(inquiryPage));
      query.set("limit", "25");

      const res = await fetch(`/api/admin/inquiries?${query.toString()}`, { cache: "no-store" });
      if (res.status === 401) {
        handleAuthError();
        return;
      }
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries || []);
        if (data.summary) setInquiriesSummary(data.summary);
        if (data.pagination) {
          setInquiryTotalPages(data.pagination.totalPages || 1);
          setInquiryTotalCount(data.pagination.totalCount || 0);
        }
      }
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    } finally {
      setInquiriesLoading(false);
    }
  }, [currentUser, inquiryStatusFilter, inquiryPage, handleAuthError]);

  // Initial Data Fetching when user logs in
  useEffect(() => {
    if (currentUser) {
      fetchJobs();
      fetchApplications();
      fetchInquiries();
    }
  }, [currentUser, fetchJobs, fetchApplications, fetchInquiries]);

  // Candidate Detail Loader (Synchronized with URL `candidate` parameter)
  const loadCandidateDetail = useCallback(async (id) => {
    if (!id) {
      setCandidateDetail(null);
      return;
    }
    setDetailLoading(true);
    try {
      const res = await fetch(`/api/admin/applications/${id}`);
      if (res.status === 401) {
        handleAuthError();
        return;
      }
      const data = await res.json();
      if (data.success) {
        setCandidateDetail(data.application);
      }
    } catch (err) {
      console.error("Failed to load candidate:", err);
    } finally {
      setDetailLoading(false);
    }
  }, [handleAuthError]);

  useEffect(() => {
    if (candidateParam) {
      loadCandidateDetail(candidateParam);
    } else {
      setCandidateDetail(null);
    }
  }, [candidateParam, loadCandidateDetail]);

  // Open Candidate Drawer
  function handleSelectCandidate(id) {
    updateUrlParams({ candidate: id });
  }

  // Close Candidate Drawer
  function handleCloseCandidate() {
    updateUrlParams({ candidate: null });
  }

  // Update Candidate Status / Rating
  async function handleUpdateCandidate(id, updates) {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.status === 401) {
        handleAuthError();
        return;
      }
      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, ...updates } : app))
        );
        if (candidateDetail?.id === id) {
          setCandidateDetail((prev) => ({ ...prev, ...updates }));
        }
        fetchApplications();
        showToast(
          updates.stage
            ? `Candidate pipeline stage moved to ${updates.stage}.`
            : updates.rating
            ? `Candidate rating set to ${updates.rating} stars.`
            : "Candidate details updated.",
          "success",
          "Candidate Updated"
        );
      }
    } catch (err) {
      console.error("Update candidate error:", err);
      showToast("Failed to update candidate record.", "error", "Error");
    }
  }

  // Add Recruiter Note
  async function handleAddNote(e) {
    e.preventDefault();
    if (!newNote.trim() || !candidateDetail) return;
    setNoteSubmitting(true);
    try {
      const res = await fetch(`/api/admin/applications/${candidateDetail.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newNote.trim() }),
      });
      if (res.status === 401) {
        handleAuthError();
        return;
      }
      const data = await res.json();
      if (data.success) {
        setNewNote("");
        loadCandidateDetail(candidateDetail.id);
        showToast("Internal evaluation note added.", "success", "Note Saved");
      }
    } catch (err) {
      console.error("Add note error:", err);
      showToast("Failed to save evaluation note.", "error", "Error");
    } finally {
      setNoteSubmitting(false);
    }
  }

  // Job Opening Create & Edit Handlers
  function handleOpenCreateJob() {
    setJobModalMode("create");
    setEditingJobId(null);
    setJobForm({
      title: "",
      slug: "",
      department: "Engineering",
      type: "FULL_TIME",
      workMode: "On-site",
      location: "Dhaka, Bangladesh",
      salary: "Negotiable",
      summary: "",
      descriptionMarkdown: "",
      requirements: "",
      benefits: "",
      status: "PUBLISHED",
      portfolioFields: ["linkedin", "github", "portfolio", "deployed"],
      screeningQuestions: [],
    });
    setShowJobModal(true);
  }

  function handleOpenEditJob(job) {
    setJobModalMode("edit");
    setEditingJobId(job.id);

    let portfolioFields = ["linkedin", "github", "portfolio", "deployed"];
    let screeningQuestions = [];

    if (job.customQuestions && typeof job.customQuestions === "object") {
      if (Array.isArray(job.customQuestions)) {
        screeningQuestions = job.customQuestions;
      } else {
        if (Array.isArray(job.customQuestions.portfolioFields)) {
          portfolioFields = job.customQuestions.portfolioFields;
        }
        if (Array.isArray(job.customQuestions.screeningQuestions)) {
          screeningQuestions = job.customQuestions.screeningQuestions;
        }
      }
    }

    setJobForm({
      title: job.title || "",
      slug: job.slug || "",
      department: job.department || "Engineering",
      type: job.type || "FULL_TIME",
      workMode: job.workMode || "On-site",
      location: job.location || "Dhaka, Bangladesh",
      salary: job.salary || "Negotiable",
      summary: job.summary || "",
      descriptionMarkdown: job.descriptionMarkdown || "",
      requirements: Array.isArray(job.requirements) ? job.requirements.join("\n") : "",
      benefits: Array.isArray(job.benefits) ? job.benefits.join("\n") : "",
      status: job.status || "PUBLISHED",
      portfolioFields,
      screeningQuestions,
    });
    setShowJobModal(true);
  }

  async function handleSaveJob(e) {
    e.preventDefault();
    setJobSubmitting(true);

    const payload = {
      title: jobForm.title.trim(),
      slug: jobForm.slug.trim().toLowerCase().replace(/\s+/g, "-"),
      department: jobForm.department,
      type: jobForm.type,
      workMode: jobForm.workMode,
      location: jobForm.location.trim(),
      salary: jobForm.salary.trim(),
      summary: jobForm.summary.trim(),
      descriptionMarkdown: jobForm.descriptionMarkdown.trim(),
      requirements: jobForm.requirements.split("\n").map((r) => r.trim()).filter(Boolean),
      benefits: jobForm.benefits.split("\n").map((b) => b.trim()).filter(Boolean),
      status: jobForm.status,
      customQuestions: {
        portfolioFields: Array.isArray(jobForm.portfolioFields) && jobForm.portfolioFields.length > 0
          ? jobForm.portfolioFields
          : ["linkedin"],
        screeningQuestions: Array.isArray(jobForm.screeningQuestions)
          ? jobForm.screeningQuestions
          : [],
      },
    };

    try {
      const url = jobModalMode === "create" ? "/api/admin/jobs" : `/api/admin/jobs/${editingJobId}`;
      const method = jobModalMode === "create" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        handleAuthError();
        return;
      }

      const data = await res.json();
      if (data.success) {
        setShowJobModal(false);
        fetchJobs();
        showToast(
          jobModalMode === "create"
            ? `"${payload.title}" Job created and published successfully.`
            : `"${payload.title}" Job updated successfully.`,
          "success",
          jobModalMode === "create" ? "Job Created" : "Job Updated"
        );
      } else {
        showToast(data.message || "Failed to save Job opening.", "error", "Save Failed");
      }
    } catch (err) {
      showToast("Error: " + err.message, "error", "Network Error");
    } finally {
      setJobSubmitting(false);
    }
  }

  async function handleToggleJobStatus(jobId, currentStatus) {
    const nextStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.status === 401) {
        handleAuthError();
        return;
      }
      fetchJobs();
      showToast(
        nextStatus === "PUBLISHED"
          ? "Job opening is now live on the public careers page."
          : "Job opening has been set to Draft (hidden from careers page).",
        "success",
        nextStatus === "PUBLISHED" ? "Job Opening Published" : "Job Opening Unpublished"
      );
    } catch (err) {
      console.error("Toggle status error:", err);
      showToast("Failed to update job opening status.", "error", "Status Update Failed");
    }
  }

  function handlePromptDeleteJob(jobId, jobTitle) {
    setConfirmModal({
      isOpen: true,
      title: "Archive Job Opening",
      message: `Are you sure you want to delete/archive "${jobTitle}"? This will hide the position from public job listings.`,
      confirmLabel: "Archive Position",
      confirmVariant: "danger",
      loading: false,
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, loading: true }));
        try {
          const res = await fetch(`/api/admin/jobs/${jobId}`, { method: "DELETE" });
          if (res.status === 401) {
            handleAuthError();
            return;
          }
          fetchJobs();
          setConfirmModal((prev) => ({ ...prev, isOpen: false, loading: false }));
          showToast(`"${jobTitle}" opening has been archived.`, "info", "Job Archived");
        } catch (err) {
          console.error("Delete job error:", err);
          setConfirmModal((prev) => ({ ...prev, loading: false }));
          showToast("Failed to archive job opening.", "error", "Archive Error");
        }
      },
    });
  }

  // Inquiry Status & Delete Handlers
  async function handleUpdateInquiryStatus(id, newStatus) {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.status === 401) {
        handleAuthError();
        return;
      }
      fetchInquiries();
      showToast(`Inquiry status updated to ${newStatus}.`, "success", "Lead Status Updated");
    } catch (err) {
      console.error("Update inquiry error:", err);
      showToast("Failed to update inquiry status.", "error", "Update Error");
    }
  }

  function handlePromptDeleteInquiry(id) {
    setConfirmModal({
      isOpen: true,
      title: "Delete Contact Inquiry",
      message: "Are you sure you want to permanently remove this contact message from your records?",
      confirmLabel: "Delete Inquiry",
      confirmVariant: "danger",
      loading: false,
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, loading: true }));
        try {
          const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
          if (res.status === 401) {
            handleAuthError();
            return;
          }
          fetchInquiries();
          setConfirmModal((prev) => ({ ...prev, isOpen: false, loading: false }));
          showToast("Lead inquiry has been permanently removed.", "info", "Lead Deleted");
        } catch (err) {
          console.error("Delete inquiry error:", err);
          setConfirmModal((prev) => ({ ...prev, loading: false }));
          showToast("Failed to delete lead inquiry.", "error", "Delete Error");
        }
      },
    });
  }

  // Settings Handlers
  function handleAvatarSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setSettingsStatus({ type: "error", message: "Please select a raster image (PNG, JPG, WebP). SVG is disabled for security." });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSettingsStatus({ type: "error", message: "Image size must be less than 5MB." });
      return;
    }

    setAvatarFile(file);
    setRemoveAvatar(false);
    setAvatarPreview(URL.createObjectURL(file));
    setSettingsStatus(null);
  }

  function handleRemoveAvatar() {
    setAvatarFile(null);
    setAvatarPreview(null);
    setRemoveAvatar(true);
    setSettingsStatus(null);
  }

  async function handleSaveSettings(e) {
    e.preventDefault();
    setSettingsStatus(null);

    if (settingsForm.newPassword) {
      if (settingsForm.newPassword.length < 6) {
        setSettingsStatus({ type: "error", message: "New password must be at least 6 characters long." });
        return;
      }
      if (settingsForm.newPassword !== settingsForm.confirmPassword) {
        setSettingsStatus({ type: "error", message: "New password and confirmation do not match." });
        return;
      }
      if (!settingsForm.currentPassword) {
        setSettingsStatus({ type: "error", message: "Please enter your current password to set a new password." });
        return;
      }
    }

    setSettingsLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullName", settingsForm.fullName);
      formData.append("email", settingsForm.email);

      if (settingsForm.newPassword) {
        formData.append("currentPassword", settingsForm.currentPassword);
        formData.append("newPassword", settingsForm.newPassword);
      }

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      } else if (removeAvatar) {
        formData.append("removeAvatar", "true");
      }

      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        body: formData,
      });

      if (res.status === 401) {
        handleAuthError();
        return;
      }

      const data = await res.json();

      if (data.success && data.user) {
        setCurrentUser(data.user);
        setAvatarFile(null);
        setAvatarPreview(null);
        setRemoveAvatar(false);
        setSettingsForm((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
        setSettingsStatus({ type: "success", message: data.message || "Settings saved successfully!" });
        showToast(data.message || "Settings saved successfully!", "success", "Settings Saved");
      } else {
        setSettingsStatus({ type: "error", message: data.message || "Failed to update settings." });
        showToast(data.message || "Failed to update settings.", "error", "Settings Failed");
      }
    } catch (err) {
      console.error(err);
      setSettingsStatus({ type: "error", message: "Network or server error while updating settings." });
      showToast("Network or server error while updating settings.", "error", "Settings Error");
    } finally {
      setSettingsLoading(false);
    }
  }

  // Auth Checking Loading State
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 text-[#33E6D8] animate-spin" />
      </div>
    );
  }

  // 1. Sleek Modern Enterprise Login Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#050608] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#33E6D8] font-mono text-sm font-bold">
                A
              </div>
              <span
                className="font-bold text-white tracking-tight text-lg"
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
              >
                AWTOMATIG
              </span>
            </div>
            <p className="text-xs text-white/40 font-mono">
              Administrative Control Console
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-[#090A0E] border border-white/[0.08] rounded-xl p-6 shadow-xl space-y-4"
          >
            {loginError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] uppercase font-mono text-white/50 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@awtomatig.com"
                className="w-full bg-[#050608] border border-white/[0.08] rounded-lg px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-mono text-white/50 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#050608] border border-white/[0.08] rounded-lg px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#33E6D8] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full mt-2 bg-[#33E6D8] hover:bg-[#02D5E7] disabled:opacity-50 text-black font-semibold py-2.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {loginLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>Sign In to Console</span>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Main Company Admin Dashboard Layout
  return (
    <div className="min-h-screen bg-[#050608] text-white flex overflow-hidden">
      {/* ── SIDEBAR NAVIGATION COMPONENT ───────────────────────── */}
      <SidebarNav
        activeSection={activeTabParam}
        onSelectSection={handleSelectSection}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
        applicationsCount={summary.all || 0}
        jobsCount={jobs.length}
        inquiriesCount={inquiriesSummary.new || 0}
        isCollapsed={desktopCollapsed}
        onToggleCollapse={handleToggleDesktopCollapse}
      />

      {/* ── MAIN CONTENT AREA ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#050608]">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#090A0E]/90 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 border border-white/[0.08] rounded-lg text-white/70 hover:text-white transition-all cursor-pointer shrink-0"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Desktop Sidebar Collapse Toggle */}
            <button
              onClick={handleToggleDesktopCollapse}
              className="hidden md:flex items-center justify-center p-2 bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 border border-white/[0.08] hover:border-[#33E6D8]/30 rounded-lg text-white/70 hover:text-[#33E6D8] transition-all cursor-pointer shrink-0"
              title={desktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-label={desktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft
                className={`w-4 h-4 transition-transform duration-300 ${
                  desktopCollapsed ? "rotate-180 text-[#33E6D8]" : "text-white/70"
                }`}
              />
            </button>

            <h1
              className="text-base sm:text-lg font-bold text-white tracking-tight font-heading truncate"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              {activeTabParam === "overview" && "Overview"}
              {activeTabParam === "pipeline" && "Candidate Applications"}
              {activeTabParam === "jobs" && "Job Openings"}
              {activeTabParam === "inquiries" && "Inquiries"}
              {activeTabParam === "analytics" && "Google Analytics"}
              {activeTabParam === "settings" && "Account Settings"}
            </h1>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {activeTabParam === "jobs" && (
              <button
                onClick={handleOpenCreateJob}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#33E6D8] text-black font-semibold text-xs rounded-lg hover:bg-[#02D5E7] transition-colors cursor-pointer whitespace-nowrap shadow-sm shadow-[#33E6D8]/20 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Opening</span>
              </button>
            )}

            <button
              onClick={() => {
                fetchJobs();
                fetchApplications();
                fetchInquiries();
              }}
              className="p-2 bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.08] rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer shrink-0 active:scale-95"
              title="Refresh Data"
              aria-label="Refresh Data"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${
                  loading || jobsLoading || inquiriesLoading
                    ? "animate-spin text-[#33E6D8]"
                    : ""
                }`}
              />
            </button>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-3.5 sm:p-5 md:p-6 lg:p-8 flex-1 flex flex-col w-full max-w-full overflow-x-hidden">
          {/* SECTION 1: OVERVIEW */}
          {activeTabParam === "overview" && (
            <OverviewSection
              jobs={jobs}
              summary={summary}
              stages={STAGES}
              onNavigateTab={handleSelectSection}
              onOpenEditJob={handleOpenEditJob}
            />
          )}

          {/* SECTION 2: CANDIDATE PIPELINE (ATS) */}
          {activeTabParam === "pipeline" && (
            <CandidatePipelineSection
              jobs={jobs}
              summary={summary}
              stages={STAGES}
              applications={applications}
              selectedJob={selectedJob}
              onSelectJob={setSelectedJob}
              search={search}
              onSearchChange={setSearch}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              stageFilter={stageFilter}
              onStageFilterChange={setStageFilter}
              currentPage={currentPage}
              totalPages={totalPages}
              totalApplications={totalApplications}
              onPageChange={setCurrentPage}
              loading={loading}
              onSelectCandidate={handleSelectCandidate}
              onUpdateCandidate={handleUpdateCandidate}
            />
          )}

          {/* SECTION 3: JOB OPENINGS MANAGER */}
          {activeTabParam === "jobs" && (
            <JobOpeningsSection
              jobs={jobs}
              loading={jobsLoading}
              onOpenCreateModal={handleOpenCreateJob}
              onOpenEditModal={handleOpenEditJob}
              onToggleStatus={handleToggleJobStatus}
              onDeleteJob={handlePromptDeleteJob}
            />
          )}

          {/* SECTION 4: CONTACT INQUIRIES & LEADS */}
          {activeTabParam === "inquiries" && (
            <ContactLeadsSection
              inquiries={inquiries}
              summary={inquiriesSummary}
              statusFilter={inquiryStatusFilter}
              onStatusFilterChange={setInquiryStatusFilter}
              currentPage={inquiryPage}
              totalPages={inquiryTotalPages}
              totalCount={inquiryTotalCount}
              onPageChange={setInquiryPage}
              loading={inquiriesLoading}
              onUpdateStatus={handleUpdateInquiryStatus}
              onDeleteInquiry={handlePromptDeleteInquiry}
            />
          )}

          {/* SECTION 5: GOOGLE ANALYTICS */}
          {activeTabParam === "analytics" && <AnalyticsSection />}

          {/* SECTION 6: SETTINGS */}
          {activeTabParam === "settings" && (
            <SettingsSection
              currentUser={currentUser}
              form={settingsForm}
              onChangeForm={setSettingsForm}
              avatarPreview={avatarPreview}
              removeAvatar={removeAvatar}
              onAvatarSelect={handleAvatarSelect}
              onRemoveAvatar={handleRemoveAvatar}
              onSubmit={handleSaveSettings}
              loading={settingsLoading}
              status={settingsStatus}
              onClearStatus={() => setSettingsStatus(null)}
            />
          )}
        </div>
      </div>

      {/* ── CANDIDATE SLIDE-OVER DRAWER COMPONENT ─────────────── */}
      <CandidateDrawer
        candidate={candidateDetail}
        loading={detailLoading}
        stages={STAGES}
        newNote={newNote}
        onNoteChange={setNewNote}
        onAddNote={handleAddNote}
        noteSubmitting={noteSubmitting}
        onUpdateCandidate={handleUpdateCandidate}
        onClose={handleCloseCandidate}
      />

      {/* ── JOB CREATION & EDIT MODAL COMPONENT ────────────────── */}
      <JobModal
        isOpen={showJobModal}
        mode={jobModalMode}
        form={jobForm}
        onChange={setJobForm}
        onSubmit={handleSaveJob}
        submitting={jobSubmitting}
        onClose={() => setShowJobModal(false)}
      />

      {/* ── CYBER-MINIMAL CONFIRMATION MODAL ───────────────────── */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmLabel={confirmModal.confirmLabel}
        confirmVariant={confirmModal.confirmVariant}
        loading={confirmModal.loading}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* ── CYBER-MINIMAL TOAST NOTIFICATIONS ──────────────────── */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}

export default function CompanyAdminDashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050507] flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 text-[#33E6D8] animate-spin" />
        </div>
      }
    >
      <AdminDashboardContent />
    </Suspense>
  );
}
