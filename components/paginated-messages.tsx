'use client';

import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_MESSAGES_BY_CHAT_SESSION_ID_PAGINATED } from '@/graphql/queries';
import { Spinner } from '@heroui/spinner';
import { useInView } from 'react-intersection-observer';
import Messages from './messages';
import { Message, MessageConnection } from '@/types';

type PaginatedMessagesProps = {
  chat_session_id: string;
  chatbotName: string;
};

function PaginatedMessages({
  chat_session_id,
  chatbotName,
}: PaginatedMessagesProps) {
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  const [loadMessages, { data, loading, error, fetchMore }] =
    useLazyQuery<MessageConnection>(GET_MESSAGES_BY_CHAT_SESSION_ID_PAGINATED, {
      variables: { chat_session_id, first: 5 },
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
    });

  const { ref, inView } = useInView({ threshold: 1.0 });

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    if (data && data.getMessagesByChatSessionIdPaginated) {
      const newMessages = data.getMessagesByChatSessionIdPaginated.edges.map(
        (edge) => edge.node
      );
      setAllMessages(newMessages);
    }
  }, [data]);

  useEffect(() => {
    if (
      inView &&
      data &&
      data.getMessagesByChatSessionIdPaginated.pageInfo.hasNextPage &&
      !loading
    ) {
      fetchMore({
        variables: {
          after: data.getMessagesByChatSessionIdPaginated.pageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            getMessagesByChatSessionIdPaginated: {
              __typename: prev.getMessagesByChatSessionIdPaginated.__typename,
              edges: [
                ...prev.getMessagesByChatSessionIdPaginated.edges,
                ...fetchMoreResult.getMessagesByChatSessionIdPaginated.edges,
              ],
              pageInfo:
                fetchMoreResult.getMessagesByChatSessionIdPaginated.pageInfo,
            },
          };
        },
      });
    }
  }, [inView, data, loading, fetchMore]);

  if (loading && allMessages.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner />
      </div>
    );
  }
  if (error) return <p>Error loading messages</p>;
  if (allMessages.length === 0) return <p>No messages</p>;

  return (
    <div>
      <Messages messages={allMessages} chatbotName={chatbotName} />
      <div ref={ref} className="h-10 flex justify-center items-center">
        {loading && <Spinner />}
      </div>
    </div>
  );
}

export default PaginatedMessages;
