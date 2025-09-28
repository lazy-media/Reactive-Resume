import { z } from "zod";

export const certificationSchema = z.object({
  Name: z.string(),
  Url: z.string().url().optional().or(z.literal("")),
  Authority: z.string(),
  "Started On": z.string(),
  "Finished On": z.string().optional(),
  "License Number": z.string(),
});
