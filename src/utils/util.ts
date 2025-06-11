import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  cover: z.string().optional().nullable(),
  description: z.string().optional(),
  name: z.string(),
  url: z.string().optional(),
});
export const CarouselSchema = z.object({
  desc: z.string().optional(),
  path: z.string(),
});

export type CarouselImage = z.infer<typeof CarouselSchema>;
export type Project = z.infer<typeof ProjectSchema>;