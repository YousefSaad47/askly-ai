import { z } from 'zod';

export const getChatbotsSchema = z.object({});
export type GetChatbotsArgs = z.infer<typeof getChatbotsSchema>;

export const getChatbotsPaginatedSchema = z.object({
  first: z.number(),
  after: z.string().optional(),
});
export type GetChatbotsPaginatedArgs = z.infer<
  typeof getChatbotsPaginatedSchema
>;

export const getChatbotByIdSchema = z.object({
  id: z.string(),
});
export type GetChatbotByIdArgs = z.infer<typeof getChatbotByIdSchema>;

export const getChatbotsByUserSchema = z.object({
  clerk_user_id: z.string(),
});
export type GetChatbotsByUserArgs = z.infer<typeof getChatbotsByUserSchema>;

export const createChatbotSchema = z.object({
  clerk_user_id: z.string().nonempty(),
  name: z.string().nonempty(),
});
export type CreateChatbotInput = z.infer<typeof createChatbotSchema>;

export const getChatbotsByUserPaginatedSchema = z.object({
  clerk_user_id: z.string(),
  first: z.number().min(1),
  after: z.string().optional(),
});

export type GetChatbotsByUserPaginatedArgs = z.infer<
  typeof getChatbotsByUserPaginatedSchema
>;

export const updateChatbotSchema = z.object({
  id: z.string(),
  clerk_user_id: z.string().optional(),
  name: z.string().optional(),
});
export type UpdateChatbotInput = z.infer<typeof updateChatbotSchema>;

export const deleteChatbotSchema = z.object({
  id: z.string(),
});
export type DeleteChatbotInput = z.infer<typeof deleteChatbotSchema>;

export const getChatbotCharacteristicsSchema = z.object({
  chatbot_id: z.string(),
});
export type GetChatbotCharacteristicsArgs = z.infer<
  typeof getChatbotCharacteristicsSchema
>;

export const getChatbotCharacteristicsPaginatedSchema = z.object({
  chatbot_id: z.string(),
  first: z.number(),
  after: z.string().optional(),
});
export type GetChatbotCharacteristicsPaginatedArgs = z.infer<
  typeof getChatbotCharacteristicsPaginatedSchema
>;

export const addChatbotCharacteristicSchema = z.object({
  chatbot_id: z.string(),
  content: z.string().nonempty(),
});
export type AddChatbotCharacteristicInput = z.infer<
  typeof addChatbotCharacteristicSchema
>;

export const deleteChatbotCharacteristicSchema = z.object({
  id: z.string(),
});
export type DeleteChatbotCharacteristicInput = z.infer<
  typeof deleteChatbotCharacteristicSchema
>;
