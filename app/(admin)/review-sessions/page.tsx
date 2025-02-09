'use client';

import ChatbotSessions from '@/components/chatbot-sessions';
import { GET_CHATBOTS_BY_USER } from '@/graphql/queries';
import { GetChatbotByUserResponse, GetChatbotByUserVariables } from '@/types';
import { useQuery } from '@apollo/client';
import { useUser } from '@clerk/nextjs';
import { Alert } from '@heroui/alert';
import { Spinner } from '@heroui/spinner';

export default function ReviewSessions() {
  const { user, isLoaded } = useUser();

  const { data, loading } = useQuery<
    GetChatbotByUserResponse,
    GetChatbotByUserVariables
  >(GET_CHATBOTS_BY_USER, {
    variables: {
      clerk_user_id: user?.id as string,
    },
    skip: !isLoaded || !user?.id,
  });

  if (!isLoaded || loading) {
    return (
      <Spinner className="relative md:top-1/2 md:left-1/2 md:mt-0 mt-10" />
    );
  }

  if (!user?.id)
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

  const chatbotsByUser = data?.getChatbotsByUser || [];

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
    </div>
  );
}
