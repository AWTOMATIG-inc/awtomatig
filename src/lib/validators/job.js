import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  department: z.string().min(2, "Department is required"),
  location: z.string().default("Dhaka, Bangladesh"),
  workMode: z.string().default("On-site"),
  salary: z.string().optional().default("Negotiable"),
  type: z.enum(["FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT"]).default("FULL_TIME"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  descriptionMarkdown: z.string().min(20, "Description markdown must be at least 20 characters"),
  requirements: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  customQuestions: z.any().optional(),
  scoringRules: z.any().optional(),
});
