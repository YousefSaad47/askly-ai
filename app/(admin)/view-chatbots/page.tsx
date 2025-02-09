'use client';

import { useUser } from '@clerk/nextjs';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import Avatar from '@/components/avatar';
import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';
import { Alert } from '@heroui/alert';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { GET_CHATBOTS_BY_USER_PAGINATED } from '@/graphql/queries';
import { Chatbot, ChatbotCharacteristic } from '@/types';

export const dynamic = 'force-dynamic';

const ViewChatbotsPage = () => {
  const { user, isLoaded } = useUser();
  const { ref, inView } = useInView({ threshold: 1.0 });

  const { data, loading, fetchMore } = useQuery(
    GET_CHATBOTS_BY_USER_PAGINATED,
    {
      variables: {
        clerk_user_id: user?.id,
        first: 5,
      },
      skip: !isLoaded || !user?.id,
      notifyOnNetworkStatusChange: true,
    }
  );

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
  const chatbots = chatbotsEdges.map((edge: { node: Chatbot }) => edge.node);

  return (
    <div className="flex-1 pb-20 p-10 flex flex-col items-center">
      <h1 className="text-xl lg:text-3xl font-semibold mb-5 text-center">
        Active Chatbots
      </h1>

      {chatbots.length === 0 && (
        <div className="text-center">
          <p>
            You have not any chatbots yet, Click on the button below to create a
            new one.
          </p>
          <Button
            color="primary"
            className="mt-5"
            as={Link}
            href="/create-chatbot"
          >
            Create Chatbot
          </Button>
        </div>
      )}

      <ul className="flex flex-col space-y-5 w-full max-w-3xl">
        {chatbots.map((chatbot: Chatbot) => (
          <Link key={chatbot.id} href={`/edit-chatbot/${chatbot.id}`}>
            <li className="relative p-10 border rounded-md bg-white dark:bg-[#17171a] border-default-200 dark:border-default-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Avatar seed={chatbot.name} />
                  <h2 className="text-xl font-bold">{chatbot.name}</h2>
                </div>
                <p className="absolute top-5 right-5 text-xs text-default-600 dark:text-default-500">
                  Created At: {new Date(chatbot.created_at).toLocaleString()}
                </p>
              </div>

              <hr className="my-2" />

              <div className="grid grid-cols-2 md:gap-10 p-5">
                <h3 className="italic">Characteristics:</h3>
              </div>
              <ul className="text-xs">
                {!chatbot.chatbot_characteristics.length && (
                  <p>No characteristics added yet.</p>
                )}
                {chatbot.chatbot_characteristics.map(
                  (characteristic: ChatbotCharacteristic) => (
                    <li
                      key={characteristic.id}
                      className="ml-16 list-disc break-words"
                    >
                      {characteristic.content}
                    </li>
                  )
                )}
              </ul>

              <h3 className="italic mt-5">No of Sessions:</h3>
              <p>{chatbot.chat_sessions.length}</p>
            </li>
          </Link>
        ))}
      </ul>

      <div ref={ref} className="h-10 flex justify-center items-center">
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default ViewChatbotsPage;
