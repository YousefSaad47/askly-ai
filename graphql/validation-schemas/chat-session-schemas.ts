import { z } from 'zod';

export const getChatSessionByIdSchema = z.object({
  id: z.string(),
});
export type GetChatSessionByIdArgs = z.infer<typeof getChatSessionByIdSchema>;

export const getChatSessionsSchema = z.object({});
export type GetChatSessionsArgs = z.infer<typeof getChatSessionsSchema>;

export const createChatSessionSchema = z.object({
  chatbot_id: z.string(),
  guest_id: z.string(),
});
export type CreateChatSessionInput = z.infer<typeof createChatSessionSchema>;

export const updateChatSessionSchema = z.object({
  id: z.string(),
  chatbot_id: z.string().optional(),
  guest_id: z.string().optional(),
});
export type UpdateChatSessionInput = z.infer<typeof updateChatSessionSchema>;

export const deleteChatSessionSchema = z.object({
  id: z.string(),
});
export type DeleteChatSessionInput = z.infer<typeof deleteChatSessionSchema>;
