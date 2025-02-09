'use client';

import { Chatbot, ChatSessionConnection } from '@/types';
import { useEffect, useState } from 'react';
import { Accordion, AccordionItem } from '@heroui/accordion';
import Avatar from './avatar';
import Link from 'next/link';
import ReactTimeAgo from 'react-timeago';
import { Button } from '@heroui/button';
import { useLazyQuery } from '@apollo/client';
import { GET_CHAT_SESSIONS_BY_CHATBOT_ID_PAGINATED } from '@/graphql/queries';
import { Spinner } from '@heroui/spinner';
import { useInView } from 'react-intersection-observer';

function ChatbotSessionList({ chatbotId }: { chatbotId: string }) {
  const [loadSessions, { data, loading, error, fetchMore }] =
    useLazyQuery<ChatSessionConnection>(
      GET_CHAT_SESSIONS_BY_CHATBOT_ID_PAGINATED,
      {
        variables: { chatbot_id: chatbotId, first: 5 },
        fetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: true,
      }
    );

  const { ref, inView } = useInView({ threshold: 1.0 });

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  useEffect(() => {
    if (
      inView &&
      data &&
      data.getChatSessionByChatbotIdPaginated.pageInfo.hasNextPage &&
      !loading
    ) {
      fetchMore({
        variables: {
          after: data.getChatSessionByChatbotIdPaginated.pageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            getChatSessionByChatbotIdPaginated: {
              __typename: prev.getChatSessionByChatbotIdPaginated.__typename,
              edges: [
                ...prev.getChatSessionByChatbotIdPaginated.edges,
                ...fetchMoreResult.getChatSessionByChatbotIdPaginated.edges,
              ],
              pageInfo:
                fetchMoreResult.getChatSessionByChatbotIdPaginated.pageInfo,
            },
          };
        },
      });
    }
  }, [inView, data, loading, fetchMore]);

  if (loading && !data)
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner />
      </div>
    );
  if (error) return <p>Error loading sessions</p>;
  if (!data || data.getChatSessionByChatbotIdPaginated.edges.length === 0) {
    return <p>No sessions found</p>;
  }

  return (
    <>
      {data.getChatSessionByChatbotIdPaginated.edges.map((edge) => {
        const session = edge.node;
        return (
          <Button
            as={Link}
            variant="flat"
            color="primary"
            href={`/review-sessions/${session.id}`}
            key={edge.cursor}
            className="relative p-10 h-auto rounded-md block mb-4"
          >
            <p className="text-lg font-bold">
              {session.guest?.name || 'Anonymous'}
            </p>
            <p className="text-sm font-light">
              {session.guest?.email || 'no email provided'}
            </p>
            <p className="absolute top-5 right-5 text-sm">
              <ReactTimeAgo date={session.created_at} />
            </p>
          </Button>
        );
      })}
      <div ref={ref} className="h-10 flex justify-center items-center">
        {loading && <Spinner />}
      </div>
    </>
  );
}

function ChatbotSessions({ chatbots }: { chatbots: Chatbot[] }) {
  const [sortedChatbots, setSortedChatbots] = useState(chatbots);

  useEffect(() => {
    const sorted = [...chatbots].sort(
      (a, b) => (b.chat_sessions?.length || 0) - (a.chat_sessions?.length || 0)
    );
    setSortedChatbots(sorted);
  }, [chatbots]);

  return (
    <div className="bg-white dark:bg-[#17171a] border border-default-200 dark:border-default-100 rounded-md">
      <Accordion>
        {sortedChatbots.map((chatbot) => (
          <AccordionItem
            key={chatbot.id}
            value={chatbot.id}
            title={
              <div className="flex text-left items-center w-full">
                <Avatar seed={chatbot.name} className="size-10 mr-4" />
                <div className="flex flex-1 justify-between space-x-4">
                  <p>{chatbot.name}</p>
                  <p className="pr-4 font-bold text-right">
                    {chatbot.chat_sessions ? chatbot.chat_sessions.length : 0}{' '}
                    sessions
                  </p>
                </div>
              </div>
            }
            className="px-10 py-5"
          >
            <ChatbotSessionList chatbotId={chatbot.id} />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default ChatbotSessions;
