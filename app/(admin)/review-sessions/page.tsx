'use client';

import ChatbotSessions from '@/components/chatbot-sessions';
import { GET_CHATBOTS_BY_USER_PAGINATED } from '@/graphql/queries';
import {
  GetChatbotsByUserPaginatedResponse,
  GetChatbotsByUserPaginatedVariables,
} from '@/types';
import { useQuery } from '@apollo/client';
import { useUser } from '@clerk/nextjs';
import { Alert } from '@heroui/alert';
import { Spinner } from '@heroui/spinner';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function ReviewSessions() {
  const { user, isLoaded } = useUser();
  const { ref, inView } = useInView({ threshold: 1.0 });

  const { data, loading, fetchMore } = useQuery<
    GetChatbotsByUserPaginatedResponse,
    GetChatbotsByUserPaginatedVariables
  >(GET_CHATBOTS_BY_USER_PAGINATED, {
    variables: {
      clerk_user_id: user?.id as string,
      first: 5,
    },
    skip: !isLoaded || !user?.id,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (
      inView &&
      data?.getChatbotsByUserPaginated?.pageInfo?.hasNextPage &&
      !loading
    ) {
      fetchMore({
        variables: {
          after: data.getChatbotsByUserPaginated.pageInfo.endCursor,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          return {
            getChatbotsByUserPaginated: {
              __typename: prevResult.getChatbotsByUserPaginated.__typename,
              edges: [
                ...prevResult.getChatbotsByUserPaginated.edges,
                ...fetchMoreResult.getChatbotsByUserPaginated.edges,
              ],
              pageInfo: fetchMoreResult.getChatbotsByUserPaginated.pageInfo,
            },
          };
        },
      });
    }
  }, [inView, data, loading, fetchMore]);

  if (!isLoaded || (loading && !data)) {
    return (
      <Spinner className="relative md:top-1/2 md:left-1/2 md:mt-0 mt-10" />
    );
  }

  if (!user?.id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert
          title="Unauthorized"
          color="danger"
          variant="faded"
          description="Please sign in to view your chatbots"
        />
      </div>
    );
  }

  const chatbotsEdges = data?.getChatbotsByUserPaginated?.edges || [];
  const chatbotsByUser = chatbotsEdges.map((edge) => edge.node);

  const sortedChatbotsByUser = chatbotsByUser.map((chatbot) => ({
    ...chatbot,
    chat_sessions: [...chatbot.chat_sessions].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ),
  }));

  return (
    <div className="flex-1 px-10">
      <h1 className="text-xl md:text-3xl font-semibold mt-10">Chat Sessions</h1>
      <h2 className="mb-5">
        Review all the chat sessions that the chatbots have had with your users.
      </h2>

      <ChatbotSessions chatbots={sortedChatbotsByUser} />

      <div ref={ref} className="h-10 flex justify-center items-center">
        {loading && <Spinner />}
      </div>
    </div>
  );
}
