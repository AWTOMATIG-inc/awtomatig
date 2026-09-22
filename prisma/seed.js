const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // 1. Seed Default Admin User
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@awtomatig.com").trim().toLowerCase();
  const rawPassword = process.env.ADMIN_PASSWORD || "Awt0m@tig!2026\\Xy9P";
  const passwordHash = await bcrypt.hash(rawPassword, 10);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: "ADMIN",
    },
    create: {
      email: adminEmail,
      fullName: "AWTOMATIG Admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`✅ Admin user seeded: ${adminUser.email} (Role: ${adminUser.role})`);

  // 2. Seed Initial Jobs
  const jobsToSeed = [
    {
      slug: "full-stack-intern",
      title: "Full-Stack Developer Intern",
      department: "Engineering",
      location: "Dhaka, Bangladesh (On-site)",
      type: "INTERNSHIP",
      status: "PUBLISHED",
      summary:
        "Join our engineering team to design, build, and deploy production-grade web applications using Next.js, Node.js, and modern databases.",
      descriptionMarkdown: `### About the Role
We are looking for an ambitious, hands-on Full-Stack Developer Intern who is passionate about writing clean, high-performance code and building real products. You will work side-by-side with senior engineers across our core stack.

### What You'll Do
- Develop responsive, interactive web interfaces using Next.js (App Router), React, and Tailwind CSS.
- Design and integrate REST APIs, database schemas, and serverless background tasks.
- Participate in code reviews, bug squashing, and performance tuning.
- Learn modern development practices including CI/CD, Git workflows, and containerization.

### Requirements
- Solid fundamentals in JavaScript / TypeScript, React, and Next.js.
- Basic understanding of database concepts (PostgreSQL / MongoDB) and REST APIs.
- Familiarity with Git & GitHub.
- Ability to join on-site in Dhaka and commit to a 3-month full-time internship program.`,
      requirements: [
        "Strong fundamentals in JavaScript, React, and Next.js",
        "Understanding of REST APIs and Database concepts (SQL / NoSQL)",
        "Familiarity with Git and modern dev tools",
        "Available on-site in Dhaka for a 3-month commitment",
      ],
      benefits: [
        "Hands-on mentorship from experienced full-stack engineers",
        "Competitive monthly intern stipend",
        "Opportunity for full-time junior role conversion",
        "Fast-paced, modern development environment with zero bureaucracy",
      ],
      customQuestions: {
        portfolioFields: ["linkedin", "github", "portfolio", "deployed"],
        screeningQuestions: [
          { id: "experience_level", label: "Experience Level", type: "select", options: ["fresher", "0_1y", "1_3y", "3y_plus"], required: true },
          { id: "nextjs_experience", label: "Next.js Experience", type: "select", options: ["lt_1m", "1_3m", "3_6m", "6_12m", "1y_plus"], required: true },
          { id: "onsite_availability", label: "Can work on-site in Dhaka?", type: "boolean", required: true },
          { id: "commit_3_months", label: "Can commit to 3 months?", type: "boolean", required: true },
        ],
      },
      scoringRules: {
        hardRejectOnsite: true,
        highPriorityThreshold: 7,
      },
    },
    {
      slug: "ui-ux-intern",
      title: "UI/UX Design Intern",
      department: "Design",
      location: "Dhaka, Bangladesh (On-site)",
      type: "INTERNSHIP",
      status: "PUBLISHED",
      summary:
        "Craft sleek, high-converting digital interfaces, interactive prototypes, and design systems for ambitious digital products.",
      descriptionMarkdown: `### About the Role
We are seeking a talented UI/UX Design Intern with a keen eye for aesthetics, micro-interactions, and functional user journeys. You will collaborate closely with product managers and engineers to turn ideas into polished user experiences.

### What You'll Do
- Create wireframes, user flows, and high-fidelity mockups in Figma.
- Design modern responsive websites, dashboards, and mobile web experiences.
- Build design tokens, components, and interactive prototypes.
- Conduct competitor UX benchmarking and user research.

### Requirements
- Strong proficiency in Figma and modern design workflows.
- A design portfolio or case study showcasing web or app design.
- Solid grasp of layout, visual hierarchy, typography, and color theory.
- Available for 3-month on-site internship in Dhaka.`,
      requirements: [
        "Proficiency in Figma and interactive prototyping",
        "Active portfolio demonstrating UI/UX sensibilities",
        "Understanding of typography, spacing, and component systems",
        "Available on-site in Dhaka for 3 months",
      ],
      benefits: [
        "Direct guidance from creative leads",
        "Real client and product work for your design portfolio",
        "Competitive monthly intern stipend",
        "Potential transition to full-time Associate Designer",
      ],
      customQuestions: {
        portfolioFields: ["linkedin", "portfolio", "github"],
        screeningQuestions: [
          { id: "experience_level", label: "Design Experience", type: "select", options: ["just_starting", "few_personal_projects", "multiple_real_projects", "freelance_client"], required: true },
          { id: "onsite_available", label: "Can work on-site in Dhaka?", type: "boolean", required: true },
          { id: "three_month_commitment", label: "Can commit to 3 months?", type: "boolean", required: true },
        ],
      },
      scoringRules: {
        requirePortfolio: true,
        highPriorityThreshold: 6,
      },
    },
    {
      slug: "content-and-seo-executive",
      title: "Content & SEO Executive",
      department: "Marketing",
      location: "Dhaka, Bangladesh (On-site)",
      type: "FULL_TIME",
      status: "PUBLISHED",
      summary:
        "Lead technical SEO, keyword intent mapping, high-impact copywriting, and organic acquisition for technology brands.",
      descriptionMarkdown: `### About the Role
AWTOMATIG is looking for a Content & SEO Executive to orchestrate our organic growth engine. You will craft compelling content that ranks, resonates, and converts visitors into leads.

### What You'll Do
- Conduct search intent, keyword gap, and competitor ranking analyses.
- Write and publish SEO-optimized technical and business articles, landing page copy, and case studies.
- Perform on-page and technical SEO audits (meta architecture, internal linking, core web vitals).
- Track ranking signals and organic conversion KPIs via GSC, Ahrefs, and Google Analytics.

### Requirements
- 1+ years of demonstrated experience in SEO and technical copywriting.
- Deep familiarity with search intent, SERP features, and content architecture.
- Exceptional written English skills with a persuasive, engaging tone.
- Hands-on experience with WordPress, Ahrefs/SEMrush, and Google Search Console.`,
      requirements: [
        "Proven experience driving organic search visibility and rankings",
        "Exceptional research, writing, and editorial skills",
        "Proficiency in SEO tooling (GSC, Ahrefs, SEMrush, Screaming Frog)",
        "Understanding of conversion-focused landing page copywriting",
      ],
      benefits: [
        "Competitive full-time salary package",
        "Performance incentives on organic growth milestones",
        "Continuous learning budget for advanced SEO tools and courses",
        "Friendly, high-impact agency culture",
      ],
      customQuestions: {
        portfolioFields: ["linkedin", "portfolio"],
        screeningQuestions: [
          { id: "written_for_businesses", label: "Have you written content for B2B tech businesses?", type: "boolean", required: true },
          { id: "monthly_articles", label: "Typical articles published per month", type: "text", required: true },
          { id: "seo_tools", label: "SEO tools you actively use", type: "text", required: false },
          { id: "office_available", label: "Available on-site full-time?", type: "boolean", required: true },
        ],
      },
      scoringRules: {
        highPriorityThreshold: 7,
      },
    },
  ];

  for (const job of jobsToSeed) {
    const upsertedJob = await prisma.job.upsert({
      where: { slug: job.slug },
      update: job,
      create: job,
    });
    console.log(`✅ Job seeded: ${upsertedJob.title} (${upsertedJob.slug})`);
  }

  console.log("✨ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
