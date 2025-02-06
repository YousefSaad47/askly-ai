import { ResolverFn } from '@/graphql/types';
import {
  getChatSessionByIdSchema,
  getChatSessionsSchema,
} from '@/graphql/validation-schemas/chatSessionSchemas';

export const getChatSessionById: ResolverFn<
  null,
  { id: string },
  any | null
> = async (_, args, { prisma }) => {
  const { id } = getChatSessionByIdSchema.parse(args);
  return await prisma.chat_sessions.findUnique({
    where: { id },
    include: {
      chatbot: true,
      guest: true,
      messages: true,
    },
  });
};

export const getChatSessions: ResolverFn<null, {}, any[]> = async (
  _,
  args,
  { prisma }
) => {
  getChatSessionsSchema.parse(args);
  return await prisma.chat_sessions.findMany({
    include: {
      chatbot: true,
      guest: true,
      messages: true,
    },
  });
};
