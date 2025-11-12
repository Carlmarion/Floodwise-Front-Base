import { z } from "zod";

// ============================================================================
// Flood kit item schemas
// ============================================================================

export const floodKitItemSchema = z
  .object({
    id: z.number().int().nonnegative(),
    title: z.string().min(1),
    description: z.string().min(1),
    videoUrl: z.string().min(1),
    imageUrl: z.string().min(1).optional(),
    size: z.string().min(1),
    installed: z.boolean().default(false),
    installationDate: z.date().optional(),
    rating: z.string().min(1),
    priority: z.enum(["low", "medium", "high"]).default("medium"),
    installationSteps: z.array(
      z.object({
        step: z.number().int().nonnegative(),
        description: z.string().min(1),
        isCompleted: z.boolean().default(false),
      }),
    ),
  })
  .strict();

export type FloodKitItemData = z.infer<typeof floodKitItemSchema>;
