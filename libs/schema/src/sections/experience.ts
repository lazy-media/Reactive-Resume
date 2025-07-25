import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";

// Schema
export const experienceSchema = itemSchema.extend({
  company: z.string().min(1),
  typeOfEmployment: z.string().min(0).optional(),
  position: z.string(),
  location: z.string(),
  date: z.string(),
  summary: z.string(),
  url: urlSchema,
  companyDescription: z.string().optional(),
});

// Type
export type Experience = z.infer<typeof experienceSchema>;

// Defaults
export const defaultExperience: Experience = {
  ...defaultItem,
  company: "",
  typeOfEmployment: "n/a",
  position: "",
  location: "",
  date: "",
  summary: "",
  companyDescription: "",
  url: defaultUrl,
};
