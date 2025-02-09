'use client';

import { GET_CHAT_SESSION_BY_ID } from '@/graphql/queries';
import {
  GetChatSessionByIdResponse,
  GetChatSessionByIdVariables,
  Message,
} from '@/types';
import { useQuery } from '@apollo/client';
import Messages from './messages';

function ChatbotSession({ id }: { id: string }) {
  const { data } = useQuery<
    GetChatSessionByIdResponse,
    GetChatSessionByIdVariables
  >(GET_CHAT_SESSION_BY_ID, {
    variables: { id },
  });

  return (
    <div className="flex-1 p-10 pb-20">
      <h1 className="text-xl md-text-3xl font-semibold">Session Review</h1>
      <p className="font-light text-xs text-gray-400 mt-2">
        Started at{' '}
        {new Date(
          data?.getChatSessionById.created_at as string
        ).toLocaleString()}
      </p>

      <h2 className="font-light mt-2">
        Between {data?.getChatSessionById.chatbot.name} &{' '}
        <span className="font-extrabold">
          {data?.getChatSessionById.guest.name} (
          {data?.getChatSessionById.guest.email})
        </span>
      </h2>

      <hr className="my-10" />

      <Messages
        messages={data?.getChatSessionById.messages as Message[]}
        chatbotName={data?.getChatSessionById.chatbot.name as string}
      />
    </div>
  );
}

export default ChatbotSession;
