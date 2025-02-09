import { ResolverFn } from '@/graphql/types';
import {
  createMessageSchema,
  updateMessageSchema,
  deleteMessageSchema,
  CreateMessageInput,
  UpdateMessageInput,
  DeleteMessageInput,
} from '@/graphql/validation-schemas/message-schemas';

export const createMessage: ResolverFn<null, CreateMessageInput, any> = async (
  _,
  args,
  { prisma }
) => {
  const data = createMessageSchema.parse(args);
  return await prisma.messages.create({ data });
};

export const updateMessage: ResolverFn<null, UpdateMessageInput, any> = async (
  _,
  args,
  { prisma }
) => {
  const { id, content, sender } = updateMessageSchema.parse(args);
  return await prisma.messages.update({
    where: { id },
    data: { content, sender },
  });
};

export const deleteMessage: ResolverFn<null, DeleteMessageInput, any> = async (
  _,
  args,
  { prisma }
) => {
  const { id } = deleteMessageSchema.parse(args);
  return await prisma.messages.delete({ where: { id } });
};
