import { z } from "zod";

// DTO-accurate schema for AddressDto
export const AddressDtoSchema = z.object({
  id: z.number().int().nonnegative(),
  propertyId: z.number().int().nonnegative(),
  addressLine: z.string().min(1),
  additionalAddressLine: z.string().nullable().optional(),
  city: z.string().min(1),
  county: z.string().min(1),
  postcode: z.string().min(1),
});

export type AddressDto = z.infer<typeof AddressDtoSchema>;
