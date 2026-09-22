import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "A valid email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const updateApplicationStatusSchema = z.object({
  stage: z.enum(["APPLIED", "SCREENING", "INTERVIEW", "OFFER", "HIRED", "REJECTED"]).optional(),
  priority: z.enum(["HIGH_PRIORITY", "MEDIUM_PRIORITY", "LOW_PRIORITY"]).optional(),
  rating: z.number().int().min(1).max(5).nullable().optional(),
  archived: z.boolean().optional(),
});

export const addNoteSchema = z.object({
  content: z.string().min(1, { message: "Note content cannot be empty" }).max(2000),
});
