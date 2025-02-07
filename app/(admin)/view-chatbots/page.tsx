'use client';

import { useUser } from '@clerk/nextjs';
import { GetChatbotByUserResponse, GetChatbotByUserVariables } from '@/types';
import Link from 'next/link';
import Avatar from '@/components/Avatar';
import { useQuery } from '@apollo/client';
import { Button } from '@heroui/button';
import { GET_CHATBOTS_BY_USER } from '@/graphql/queries';
import { Spinner } from '@heroui/spinner';
import { Alert } from '@heroui/alert';

export const dynamic = 'force-dynamic';

const ViewChatbotsPage = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
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

  const { data, loading } = useQuery<
    GetChatbotByUserResponse,
    GetChatbotByUserVariables
  >(GET_CHATBOTS_BY_USER, {
    variables: {
      clerk_user_id: user.id,
    },
    skip: !user.id,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  const chatbotsByUser = data?.getChatbotsByUser || [];

  const sortedChatbotsByUser = [...chatbotsByUser].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="flex-1 pb-20 p-10">
      <h1 className="text-xl lg-text-3xl font-semibold mb-5">
        Active Chatbots
      </h1>

      {sortedChatbotsByUser.length === 0 && (
        <div>
          <p>
            You have not any chatbots yet, Click on the button below to create a
            new one
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

      <ul className="flex flex-col space-y-5 ">
        {sortedChatbotsByUser.map((chatbot) => (
          <Link key={chatbot.id} href={`/edit-chatbot/${chatbot.id}`}>
            <li className="relative p-10 border rounded-md max-w-3xl bg-white dark:bg-[#17171a] border-default-200 dark:border-default-100">
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

                {chatbot.chatbot_characteristics.map((characteristic) => (
                  <li
                    className="ml-16 list-disc break-words"
                    key={characteristic.id}
                  >
                    {characteristic.content}
                  </li>
                ))}
              </ul>

              <h3 className="italic mt-5">No of Sessions:</h3>
              <p>{chatbot.chat_sessions.length}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
export default ViewChatbotsPage;
