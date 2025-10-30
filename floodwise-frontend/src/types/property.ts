import { z } from "zod";
import { AddressDtoSchema } from "@/types/address";

// ============================================================================
// Property Core Schemas
// ============================================================================

export const propertyCoordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const propertyInfoSchema = z.object({
  id: z.string().min(1),
  emoji: z.string().min(1),
  name: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1).max(2),
  zip: z.string().min(1),
  authority: z.string().min(1),
  flood_zone: z.string().min(1),
  coordinates: propertyCoordinatesSchema,
});

export const propertyAddressSchema = z.object({
  id: z.number().int().nonnegative().default(0),
  propertyId: z.number().int().nonnegative(),
  addressLine: z.string().min(1, "Address line is required."),
  additionalAddressLine: z.string().optional().nullable(),
  city: z.string().min(1, "City is required."),
  county: z.string().min(1, "County is required."),
  postcode: z.string().min(1, "Postcode is required."),
});

// ============================================================================
// DTO-accurate Schemas (Backend contract)
// ============================================================================

export const AdditionalAttributeDtoSchema = z.object({
  id: z.number().int().nonnegative(),
  attributeId: z.number().int().nonnegative(),
  questionCode: z.string().max(300).min(1),
  value: z.string().min(1),
});

export const PropertyAttributeDtoSchema = z.object({
  id: z.number().int().nonnegative(),
  propertyId: z.number().int().nonnegative(),
  isAssessmentCompleted: z.boolean(),
  questionCode: z.string().max(300).min(1),
  value: z.string().min(1),
  answeredAt: z.coerce.date().nullable().optional(),
  additionalAttributes: z.array(AdditionalAttributeDtoSchema).default([]),
});

export const PropertyDtoSchema = z.object({
  id: z.number().int().nonnegative(),
  customerId: z.number().int().nonnegative(),
  isAssessmentCompleted: z.boolean(),
  address: AddressDtoSchema,
  attributes: z.array(PropertyAttributeDtoSchema).default([]),
});

// ============================================================================
// Type Exports
// ============================================================================

export type PropertyInfo = z.infer<typeof propertyInfoSchema>;
export type PropertyCoordinates = z.infer<typeof propertyCoordinatesSchema>;
export type PropertyAddress = z.infer<typeof propertyAddressSchema>;

export type AdditionalAttributeDto = z.infer<
  typeof AdditionalAttributeDtoSchema
>;
export type PropertyAttributeDto = z.infer<typeof PropertyAttributeDtoSchema>;
export type PropertyDto = z.infer<typeof PropertyDtoSchema>;
