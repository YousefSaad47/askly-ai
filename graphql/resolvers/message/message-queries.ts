import { ResolverFn } from '@/graphql/types';
import {
  getMessageByIdSchema,
  getMessagesSchema,
} from '@/graphql/validation-schemas/message-schemas';

export const getMessageById: ResolverFn<
  null,
  { id: string },
  any | null
> = async (_, args, { prisma }) => {
  const { id } = getMessageByIdSchema.parse(args);
  return await prisma.messages.findUnique({
    where: { id },
    include: { chat_session: true },
  });
};

export const getMessages: ResolverFn<null, {}, any[]> = async (
  _,
  args,
  { prisma }
) => {
  getMessagesSchema.parse(args);
  return await prisma.messages.findMany({
    include: { chat_session: true },
  });
};
