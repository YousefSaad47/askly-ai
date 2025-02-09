import { ResolverFn } from '@/graphql/types';
import {
  createChatSessionSchema,
  updateChatSessionSchema,
  deleteChatSessionSchema,
  CreateChatSessionInput,
  UpdateChatSessionInput,
  DeleteChatSessionInput,
} from '@/graphql/validation-schemas/chat-session-schemas';

export const createChatSession: ResolverFn<
  null,
  CreateChatSessionInput,
  any
> = async (_, args, { prisma }) => {
  const data = createChatSessionSchema.parse(args);
  return await prisma.chat_sessions.create({ data });
};

export const updateChatSession: ResolverFn<
  null,
  UpdateChatSessionInput,
  any
> = async (_, args, { prisma }) => {
  const { id, chatbot_id, guest_id } = updateChatSessionSchema.parse(args);
  return await prisma.chat_sessions.update({
    where: { id },
    data: { chatbot_id, guest_id },
  });
};

export const deleteChatSession: ResolverFn<
  null,
  DeleteChatSessionInput,
  any
> = async (_, args, { prisma }) => {
  const { id } = deleteChatSessionSchema.parse(args);
  return await prisma.chat_sessions.delete({ where: { id } });
};
