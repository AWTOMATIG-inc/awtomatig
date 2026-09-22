"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  ArrowRight,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building2,
} from "lucide-react";

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (selectedDept !== "all") query.set("department", selectedDept);
        if (selectedType !== "all") query.set("type", selectedType);
        if (search.trim()) query.set("search", search.trim());

        const res = await fetch(`/api/jobs?${query.toString()}`);
        const data = await res.json();
        if (data.success) {
          setJobs(data.jobs || []);
          if (data.departments) setDepartments(data.departments);
        }
      } catch (err) {
        console.error("Failed to load jobs:", err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(fetchJobs, 250);
    return () => clearTimeout(timer);
  }, [search, selectedDept, selectedType]);

  const typeLabels = {
    INTERNSHIP: "Internship",
    FULL_TIME: "Full-Time",
    PART_TIME: "Part-Time",
    CONTRACT: "Contract",
  };

  return (
    <main className="min-h-screen bg-[#050608] text-white pt-28 pb-24 px-4 sm:px-6">
      {/* Background ambient glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#33E6D8]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-full max-w-7xl mx-auto">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-8 mt-16">
            Build the next frontier of{" "}
            <span className="bg-gradient-to-r from-[#02D5E7] to-white bg-clip-text text-transparent">
              digital craft.
            </span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            We are an elite collective of developers, designers, and strategists crafting
            high-performance digital products and automation engines.
          </p>
        </div>

        {/* Search & Filters Bar */}
        <div className="bg-[#090A0E] border border-white/[0.08] rounded-2xl p-4 sm:p-5 mb-10 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-3.5 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, skills, or department..."
                className="w-full bg-[#050608] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 sm:py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#33E6D8] transition-colors"
              />
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setSelectedDept("all")}
                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  selectedDept === "all"
                    ? "bg-[#02D5E7] text-black font-semibold"
                    : "bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                All Departments
              </button>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    selectedDept === dept
                      ? "bg-[#02D5E7] text-black font-semibold"
                      : "bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#050608] border border-white/[0.08] rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white/80 focus:outline-none focus:border-[#33E6D8] transition-colors cursor-pointer"
            >
              <option value="all">All Role Types</option>
              <option value="INTERNSHIP">Internships</option>
              <option value="FULL_TIME">Full-Time</option>
              <option value="PART_TIME">Part-Time</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>
        </div>

        {/* ── OPEN JOB POSITIONS (Structured Horizontal Row Cards) ── */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#02D5E7]">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                  Open Job Positions
                </h2>
                <p className="text-xs text-white/50 font-mono mt-0.5">
                  {jobs.length} position{jobs.length === 1 ? "" : "s"} currently accepting applications
                </p>
              </div>
            </div>
          </div>

          {/* Loading Skeletons */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-[#090A0E] border border-white/[0.08] rounded-xl p-6 animate-pulse flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-2.5 flex-1">
                    <div className="w-56 h-5 bg-white/10 rounded" />
                    <div className="flex gap-3">
                      <div className="w-24 h-4 bg-white/10 rounded" />
                      <div className="w-32 h-4 bg-white/10 rounded" />
                    </div>
                  </div>
                  <div className="w-28 h-9 bg-white/10 rounded-lg" />
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-[#090A0E] border border-white/[0.08] rounded-2xl p-12 text-center max-w-lg mx-auto">
              <Briefcase className="w-10 h-10 text-white/20 mx-auto mb-3" />
              <h3 className="text-lg font-heading font-bold text-white mb-1.5">
                No active openings found
              </h3>
              <p className="text-sm text-white/50 mb-6 leading-relaxed">
                Try adjusting your search terms or filter selection to see available positions.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedDept("all");
                  setSelectedType("all");
                }}
                className="px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl text-sm font-semibold text-white transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            /* Horizontal Row Cards List */
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="group bg-[#090A0E] hover:bg-[#0D0F14] border border-white/[0.08] hover:border-[#02D5E7]/40 rounded-2xl p-6 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm"
                >
                  {/* Left Column: Job Title & Meta Tags */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/careers/${job.slug}`}
                      className="block group-hover:text-[#02D5E7] transition-colors"
                    >
                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight mb-2.5 truncate">
                        {job.title}
                      </h3>
                    </Link>

                    {/* Metadata Badges Row */}
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="flex items-center gap-1.5 text-white/70 font-medium">
                        <Building2 className="w-4 h-4 text-[#02D5E7] shrink-0" />
                        <span>AWTOMATIG • {job.department}</span>
                      </span>

                      <span className="flex items-center gap-1.5 text-white/60">
                        <MapPin className="w-4 h-4 text-white/40 shrink-0" />
                        <span>{job.location || "Dhaka, Bangladesh"}</span>
                      </span>

                      <span className="text-xs font-mono uppercase px-2.5 py-1 rounded-md bg-white/[0.04] text-white/70 border border-white/[0.06]">
                        {job.workMode || "On-site"}
                      </span>

                      {job.salary && (
                        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                          <span>৳</span> {job.salary}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Middle Column: Date & Vacancies Info */}
                  <div className="hidden sm:flex flex-col lg:items-start text-left shrink-0 min-w-[150px]">
                    <p className="text-sm font-mono text-white/80 font-medium">
                      {new Date(job.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-white/50 mt-0.5 font-mono">
                      {typeLabels[job.type] || job.type} • 1 vacancy
                    </p>
                  </div>

                  {/* Right Column: Apply Now CTA */}
                  <div className="shrink-0 flex items-center">
                    <Link
                      href={`/careers/${job.slug}`}
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#02D5E7] hover:bg-[#02D5E7] text-black font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shadow-[0_0_15px_rgba(51,230,216,0.2)]"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Why AWTOMATIG Culture Section */}
        <div className="border-t border-white/[0.08] pt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-3 tracking-tight">
              Why Build With Us?
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              We operate like a modern software studio: high standards, high autonomy, and direct
              impact from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#090A0E] border border-white/[0.08] rounded-2xl p-6 sm:p-7">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] text-[#33E6D8] border border-white/[0.06] flex items-center justify-center mb-5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-heading font-bold text-white mb-2">
                Modern Tech Stack
              </h4>
              <p className="text-sm text-white/60 leading-relaxed">
                Work directly with Next.js 16, React 19, Tailwind CSS 4, PostgreSQL, Prisma, GSAP,
                and AI engineering workflows.
              </p>
            </div>

            <div className="bg-[#090A0E] border border-white/[0.08] rounded-2xl p-6 sm:p-7">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] text-[#33E6D8] border border-white/[0.06] flex items-center justify-center mb-5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-heading font-bold text-white mb-2">
                Direct Mentorship
              </h4>
              <p className="text-sm text-white/60 leading-relaxed">
                Pair program directly with tech leads and principal designers who have built
                scalable software products globally.
              </p>
            </div>

            <div className="bg-[#090A0E] border border-white/[0.08] rounded-2xl p-6 sm:p-7">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] text-[#33E6D8] border border-white/[0.06] flex items-center justify-center mb-5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-heading font-bold text-white mb-2">
                Rapid Career Trajectory
              </h4>
              <p className="text-sm text-white/60 leading-relaxed">
                We hire for velocity and mindset. High-performing team members regularly convert
                into core engineers and product owners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
