import { z } from "zod";

// ============================================================================
// DTO-accurate Schema (Backend contract)
// ============================================================================

export const UpdateNotificationsDtoSchema = z.object({
  email: z
    .string()
    .email("Invalid email address.")
    .min(1, "Email is required."),
  enableReminder: z.boolean(),
  enableNotification: z.boolean(),
});

// ============================================================================
// Type Exports
// ============================================================================

export type UpdateNotificationsDto = z.infer<
  typeof UpdateNotificationsDtoSchema
>;
