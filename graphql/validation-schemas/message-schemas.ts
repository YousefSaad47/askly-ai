import { z } from 'zod';

export const getMessageByIdSchema = z.object({
  id: z.string(),
});
export type GetMessageByIdArgs = z.infer<typeof getMessageByIdSchema>;

export const getMessagesSchema = z.object({});
export type GetMessagesArgs = z.infer<typeof getMessagesSchema>;

export const createMessageSchema = z.object({
  chat_session_id: z.string(),
  content: z.string().nonempty(),
  sender: z.string().nonempty(),
});
export type CreateMessageInput = z.infer<typeof createMessageSchema>;

export const updateMessageSchema = z.object({
  id: z.string(),
  content: z.string().optional(),
  sender: z.string().optional(),
});
export type UpdateMessageInput = z.infer<typeof updateMessageSchema>;

export const deleteMessageSchema = z.object({
  id: z.string(),
});
export type DeleteMessageInput = z.infer<typeof deleteMessageSchema>;

export const getMessagesByChatSessionIdPaginatedSchema = z.object({
  chat_session_id: z.string(),
  first: z.number().min(1),
  after: z.string().optional(),
});

export type GetMessagesByChatSessionIdPaginatedArgs = z.infer<
  typeof getMessagesByChatSessionIdPaginatedSchema
>;
