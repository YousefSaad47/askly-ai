import { ResolverFn } from '@/graphql/types';
import {
  GetChatSessionByChatbotIdPaginatedArgs,
  getChatSessionByChatbotIdPaginatedSchema,
  GetChatSessionByIdArgs,
  getChatSessionByIdSchema,
  GetChatSessionsArgs,
  getChatSessionsSchema,
} from '@/graphql/validation-schemas/chat-session-schemas';

export const getChatSessionById: ResolverFn<
  null,
  GetChatSessionByIdArgs,
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

export const getChatSessions: ResolverFn<
  null,
  GetChatSessionsArgs,
  any[]
> = async (_, args, { prisma }) => {
  getChatSessionsSchema.parse(args);
  return await prisma.chat_sessions.findMany({
    include: {
      chatbot: true,
      guest: true,
      messages: true,
    },
  });
};

export const getChatSessionByChatbotIdPaginated: ResolverFn<
  null,
  GetChatSessionByChatbotIdPaginatedArgs,
  {
    edges: { node: any; cursor: string }[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  }
> = async (_, args, { prisma }) => {
  const { chatbot_id, first, after } =
    getChatSessionByChatbotIdPaginatedSchema.parse(args);

  const take = first + 1;

  const chat_sessions = await prisma.chat_sessions.findMany({
    where: { chatbot_id },
    take,
    skip: after ? 1 : 0,
    cursor: after ? { id: after } : undefined,
    orderBy: { created_at: 'desc' },
    include: {
      guest: true,
      messages: true,
      chatbot: true,
    },
  });

  const hasNextPage = chat_sessions.length > first;
  const nodes = hasNextPage ? chat_sessions.slice(0, -1) : chat_sessions;

  return {
    edges: nodes.map((node) => ({ node, cursor: node.id })),
    pageInfo: {
      hasNextPage,
      endCursor: nodes[nodes.length - 1]?.id ?? null,
    },
  };
};
