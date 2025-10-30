import { z } from "zod";

export const ApiResponseSchema = z.object({
  success: z.boolean().describe("Indicates if the API call was successful."),
  message: z
    .string()
    .optional()
    .nullable()
    .describe("Optional message from the API call."),
});

export const ApiFailedResponseSchema = z.object({
  error: z
    .array(z.string())
    .optional()
    .nullable()
    .describe("Errors that occured during the request processing, if any."),
});

export const ApiNotificationResponseSchema = z.object({
  id: z.number().int().nonnegative().describe("Id of the notification."),
  customerId: z.number().int().nonnegative().describe("Id of the customer."),
  messageId: z.number().int().nonnegative().describe("Id of the message."),
});

export const ApiSuccessResponseSchema = <T extends z.ZodTypeAny>(
  payloadSchema: T,
) =>
  ApiResponseSchema.extend({
    payload: payloadSchema
      .optional()
      .nullable()
      .describe(
        "Response payload containing the requested data or result of the operation.",
      ),
  });

export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export type ApiFailedResponse = z.infer<typeof ApiFailedResponseSchema>;
export type ApiNotificationResponse = z.infer<
  typeof ApiNotificationResponseSchema
>;
export type SuccessResponse<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof ApiSuccessResponseSchema<T>>
>;
