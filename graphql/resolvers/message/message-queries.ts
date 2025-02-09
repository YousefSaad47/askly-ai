import { ResolverFn } from '@/graphql/types';
import {
  GetMessageByIdArgs,
  getMessageByIdSchema,
  GetMessagesArgs,
  GetMessagesByChatSessionIdPaginatedArgs,
  getMessagesByChatSessionIdPaginatedSchema,
  getMessagesSchema,
} from '@/graphql/validation-schemas/message-schemas';

export const getMessageById: ResolverFn<
  null,
  GetMessageByIdArgs,
  any | null
> = async (_, args, { prisma }) => {
  const { id } = getMessageByIdSchema.parse(args);
  return await prisma.messages.findUnique({
    where: { id },
    include: { chat_session: true },
  });
};

export const getMessages: ResolverFn<null, GetMessagesArgs, any[]> = async (
  _,
  args,
  { prisma }
) => {
  getMessagesSchema.parse(args);
  return await prisma.messages.findMany({
    include: { chat_session: true },
  });
};

export const getMessagesByChatSessionIdPaginated: ResolverFn<
  null,
  GetMessagesByChatSessionIdPaginatedArgs,
  {
    edges: { node: any; cursor: string }[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  }
> = async (_, args, { prisma }) => {
  const { chat_session_id, first, after } =
    getMessagesByChatSessionIdPaginatedSchema.parse(args);

  const take = first + 1;

  const messages = await prisma.messages.findMany({
    where: { chat_session_id },
    take,
    skip: after ? 1 : 0,
    cursor: after ? { id: after } : undefined,
    // Order as desired – here we use ascending order (older messages first)
    orderBy: { created_at: 'asc' },
  });

  const hasNextPage = messages.length > first;
  const nodes = hasNextPage ? messages.slice(0, first) : messages;

  return {
    edges: nodes.map((message) => ({
      node: message,
      cursor: message.id,
    })),
    pageInfo: {
      hasNextPage,
      endCursor: nodes.length > 0 ? nodes[nodes.length - 1].id : null,
    },
  };
};
