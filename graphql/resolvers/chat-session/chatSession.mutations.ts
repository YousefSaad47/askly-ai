import { ResolverFn } from '@/graphql/types';
import {
  createChatSessionSchema,
  updateChatSessionSchema,
  deleteChatSessionSchema,
} from '@/graphql/validation-schemas/chatSessionSchemas';

export const createChatSession: ResolverFn<
  null,
  { chatbot_id: string; guest_id?: string },
  any
> = async (_, args, { prisma }) => {
  const data = createChatSessionSchema.parse(args);
  return await prisma.chat_sessions.create({ data });
};

export const updateChatSession: ResolverFn<
  null,
  { id: string; chatbot_id?: string; guest_id?: string },
  any
> = async (_, args, { prisma }) => {
  const { id, chatbot_id, guest_id } = updateChatSessionSchema.parse(args);
  return await prisma.chat_sessions.update({
    where: { id },
    data: { chatbot_id, guest_id },
  });
};

export const deleteChatSession: ResolverFn<null, { id: string }, any> = async (
  _,
  args,
  { prisma }
) => {
  const { id } = deleteChatSessionSchema.parse(args);
  return await prisma.chat_sessions.delete({ where: { id } });
};
