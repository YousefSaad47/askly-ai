import { ResolverFn } from '@/graphql/types';
import {
  createMessageSchema,
  updateMessageSchema,
  deleteMessageSchema,
} from '@/graphql/validation-schemas/messageSchemas';

export const createMessage: ResolverFn<
  null,
  { chat_session_id: string; content: string; sender: string },
  any
> = async (_, args, { prisma }) => {
  const data = createMessageSchema.parse(args);
  return await prisma.messages.create({ data });
};

export const updateMessage: ResolverFn<
  null,
  { id: string; content?: string; sender?: string },
  any
> = async (_, args, { prisma }) => {
  const { id, content, sender } = updateMessageSchema.parse(args);
  return await prisma.messages.update({
    where: { id },
    data: { content, sender },
  });
};

export const deleteMessage: ResolverFn<null, { id: string }, any> = async (
  _,
  args,
  { prisma }
) => {
  const { id } = deleteMessageSchema.parse(args);
  return await prisma.messages.delete({ where: { id } });
};
