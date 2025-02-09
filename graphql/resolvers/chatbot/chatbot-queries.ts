import { ResolverFn } from '@/graphql/types';
import {
  getChatbotsSchema,
  getChatbotsPaginatedSchema,
  getChatbotByIdSchema,
  getChatbotsByUserSchema,
  GetChatbotsArgs,
  GetChatbotsPaginatedArgs,
  GetChatbotByIdArgs,
  GetChatbotsByUserArgs,
  GetChatbotsByUserPaginatedArgs,
  getChatbotsByUserPaginatedSchema,
  GetChatbotCharacteristicsPaginatedArgs,
  getChatbotCharacteristicsPaginatedSchema,
} from '@/graphql/validation-schemas/chatbot-schemas';

export const getChatbots: ResolverFn<null, GetChatbotsArgs, any[]> = async (
  _,
  args,
  { prisma }
) => {
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
  GetChatbotsPaginatedArgs,
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
  GetChatbotByIdArgs,
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
  GetChatbotsByUserArgs,
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

export const getChatbotsByUserPaginated: ResolverFn<
  null,
  GetChatbotsByUserPaginatedArgs,
  {
    edges: { node: any; cursor: string }[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  }
> = async (_, args, { prisma }) => {
  const { clerk_user_id, first, after } =
    getChatbotsByUserPaginatedSchema.parse(args);

  const take = first + 1;

  const chatbots = await prisma.chatbots.findMany({
    where: { clerk_user_id },
    take,
    skip: after ? 1 : 0,
    cursor: after ? { id: after } : undefined,
    orderBy: { id: 'asc' },
    include: {
      chat_sessions: { include: { messages: true, guest: true } },
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

export const getChatbotCharacteristicsPaginated: ResolverFn<
  null,
  GetChatbotCharacteristicsPaginatedArgs,
  any
> = async (_, args, { prisma }) => {
  const { chatbot_id, first, after } =
    getChatbotCharacteristicsPaginatedSchema.parse(args);

  const take = first + 1;

  const characteristics = await prisma.chatbot_characteristics.findMany({
    where: { chatbot_id },
    take,
    skip: after ? 1 : 0,
    cursor: after ? { id: after } : undefined,
    orderBy: { created_at: 'desc' },
  });

  const hasNextPage = characteristics.length > first;
  const nodes = hasNextPage ? characteristics.slice(0, first) : characteristics;

  return {
    edges: nodes.map((node) => ({
      node,
      cursor: node.id,
    })),
    pageInfo: {
      hasNextPage,
      endCursor: nodes.length > 0 ? nodes[nodes.length - 1].id : null,
    },
  };
};
