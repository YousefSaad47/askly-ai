import { merge } from 'lodash';

import { chatbotQueries, chatbotMutations } from '@/graphql/resolvers/chatbot';
import {
  chatSessionQueries,
  chatSessionMutations,
} from '@/graphql/resolvers/chat-session';
import { guestQueries, guestMutations } from '@/graphql/resolvers/guest';
import { messageQueries, messageMutations } from '@/graphql/resolvers/message';

export const resolvers = merge(
  {},
  {
    Query: {
      ...chatbotQueries,
      ...chatSessionQueries,
      ...guestQueries,
      ...messageQueries,
    },
  },
  {
    Mutation: {
      ...chatbotMutations,
      ...chatSessionMutations,
      ...guestMutations,
      ...messageMutations,
    },
  }
);
