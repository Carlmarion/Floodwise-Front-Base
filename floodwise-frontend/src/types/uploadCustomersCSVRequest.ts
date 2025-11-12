import { z } from "zod";

// ============================================================================
// DTO-accurate Schema (Backend contract)
// ============================================================================

export const UploadCustomersCsvRequestDtoSchema = z.object({
  file: z.instanceof(File, { message: "File is required." }),
  separator: z
    .string()
    .min(1, "Separator is required.")
    .length(1, "Separator must be a single character."),
});

// ============================================================================
// Type Exports
// ============================================================================

export type UploadCustomersCsvRequestDto = z.infer<
  typeof UploadCustomersCsvRequestDtoSchema
>;
