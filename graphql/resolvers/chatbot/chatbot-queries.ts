import { ResolverFn } from '@/graphql/types';
import {
  getChatbotsSchema,
  getChatbotsPaginatedSchema,
  getChatbotByIdSchema,
  getChatbotsByUserSchema,
} from '@/graphql/validation-schemas/chatbot-schemas';

export const getChatbots: ResolverFn<null, {}, any[]> = async (
  _,
  args,
  { prisma }
) => {
  // Validate arguments (if any)
  getChatbotsSchema.parse(args);
  return await prisma.chatbots.findMany({
    include: {
      chat_sessions: true,
      chatbot_characteristics: true,
    },
  });
};

export const getChatbotsPaginated: ResolverFn<
  null,
  { first: number; after?: string },
  {
    edges: { node: any; cursor: string }[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  }
> = async (_, args, { prisma }) => {
  const { first, after } = getChatbotsPaginatedSchema.parse(args);
  const take = first + 1;
  const chatbots = await prisma.chatbots.findMany({
    take,
    skip: after ? 1 : 0,
    cursor: after ? { id: after } : undefined,
    orderBy: { id: 'asc' },
    include: {
      chat_sessions: true,
      chatbot_characteristics: true,
    },
  });
  const hasNextPage = chatbots.length > first;
  const nodes = hasNextPage ? chatbots.slice(0, -1) : chatbots;
  return {
    edges: nodes.map((node) => ({ node, cursor: node.id })),
    pageInfo: {
      hasNextPage,
      endCursor: nodes[nodes.length - 1]?.id ?? null,
    },
  };
};

export const getChatbotById: ResolverFn<
  null,
  { id: string },
  any | null
> = async (_, args, { prisma }) => {
  const { id } = getChatbotByIdSchema.parse(args);
  return await prisma.chatbots.findUnique({
    where: { id },
    include: {
      chat_sessions: true,
      chatbot_characteristics: true,
    },
  });
};

export const getChatbotsByUser: ResolverFn<
  null,
  { clerk_user_id: string },
  any[]
> = async (_, args, { prisma }) => {
  const { clerk_user_id } = getChatbotsByUserSchema.parse(args);
  return await prisma.chatbots.findMany({
    where: { clerk_user_id },
    include: {
      chat_sessions: { include: { messages: true, guest: true } },
      chatbot_characteristics: true,
    },
  });
};
