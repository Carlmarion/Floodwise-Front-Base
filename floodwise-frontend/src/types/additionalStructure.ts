import { z } from "zod";

export const BuildingTypeEnum = z.enum(["garage", "shed", "outbuilding"]);
export type BuildingType = z.infer<typeof BuildingTypeEnum>;

export const AirbricksSchema = z.object({
  singleAirbrick: z.number().int().nonnegative().optional(),
  doubleAirbrick: z.number().int().nonnegative().optional(),
  weepVent: z.number().int().nonnegative().optional(),
  irregularAirbrick: z.number().int().nonnegative().optional(),
});

export const AdditionalStructureSchema = z.object({
  name: z.string().min(1, "Name is required.").max(100),
  type: BuildingTypeEnum,
  isConnected: z.boolean(),
  numberOfDoors: z.number().int().nonnegative().default(0),
  airbricks: AirbricksSchema.optional(),
});

export type AdditionalStructure = z.infer<typeof AdditionalStructureSchema>;
export type Airbricks = z.infer<typeof AirbricksSchema>;
