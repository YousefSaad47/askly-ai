'use client';

import { GET_CHAT_SESSION_BY_ID } from '@/graphql/queries';
import {
  GetChatSessionByIdResponse,
  GetChatSessionByIdVariables,
} from '@/types';
import { useQuery } from '@apollo/client';
import { Spinner } from '@heroui/spinner';
import PaginatedMessages from './paginated-messages';

function ChatbotSession({ id }: { id: string }) {
  const { data, loading, error } = useQuery<
    GetChatSessionByIdResponse,
    GetChatSessionByIdVariables
  >(GET_CHAT_SESSION_BY_ID, {
    variables: { id },
    fetchPolicy: 'cache-first',
  });

  if (loading) return <Spinner className="relative left-1/2 top-1/2" />;
  if (error) return <p>Error loading session</p>;

  const session = data?.getChatSessionById;
  if (!session) return <p>No session found</p>;

  return (
    <div className="flex-1 p-10 pb-20">
      <h1 className="text-xl md:text-3xl font-semibold">Session Review</h1>
      <p className="font-light text-xs text-gray-400 mt-2">
        Started at {new Date(session.created_at).toLocaleString()}
      </p>
      <h2 className="font-light mt-2">
        Between {session.chatbot.name} &amp;{' '}
        <span className="font-extrabold">
          {session.guest.name} ({session.guest.email})
        </span>
      </h2>
      <hr className="my-10" />
      <PaginatedMessages
        chat_session_id={session.id}
        chatbotName={session.chatbot.name}
      />
    </div>
  );
}

export default ChatbotSession;
