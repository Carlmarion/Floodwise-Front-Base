import { z } from "zod";
import { PropertyDtoSchema } from "@/types/property";

// ============================================================================
// DTO-accurate Schema (Backend contract)
// ============================================================================

export const CustomerInfoSchema = z.object({
  id: z.number().int().nonnegative(),
  sid: z.string().nullable().optional(),
  firstName: z.string().min(1, "First name is required.").max(100),
  lastName: z.string().min(1, "Last name is required.").max(100),
  email: z.string().email("Invalid email address.").max(100),
  phoneNumber: z.string().min(1, "Phone number is required.").max(100),
  insureReference: z.string().max(100).nullable().optional(),
  password: z.string().max(100).nullable().optional(),
  isReminderActive: z.boolean().nullable().optional(),
  isNotificationActive: z.boolean().nullable().optional(),
  properties: z.array(PropertyDtoSchema).nullable().optional(),
});

// ============================================================================
// Type Exports
// ============================================================================

export type CustomerInfo = z.infer<typeof CustomerInfoSchema>;
