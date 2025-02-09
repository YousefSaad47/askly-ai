'use client';

import { Chatbot } from '@/types';
import { useEffect, useState } from 'react';
import { Accordion, AccordionItem } from '@heroui/accordion';
import Avatar from './avatar';
import Link from 'next/link';
import ReactTimeAgo from 'react-timeago';
import { Button } from '@heroui/button';

function ChatbotSessions({ chatbots }: { chatbots: Chatbot[] }) {
  const [sortedChatbots, setSortedChatbots] = useState(chatbots);

  useEffect(() => {
    const sortedChatbots = [...chatbots].sort(
      (a, b) => b.chat_sessions.length - a.chat_sessions.length
    );

    setSortedChatbots(sortedChatbots);
  }, [chatbots]);

  return (
    <div className="bg-white dark:bg-[#17171a] border border-default-200 dark:border-default-100 rounded-md">
      <Accordion>
        {sortedChatbots.map((chatbot) => {
          const hadSessions = chatbot.chat_sessions.length > 0;

          return (
            <AccordionItem
              key={chatbot.id}
              value={chatbot.id}
              title={
                <div className="flex text-left items-center w-full">
                  <Avatar seed={chatbot.name} className="size-10 mr-4" />
                  <div className="flex flex-1 justify-between space-x-4">
                    <p>{chatbot.name}</p>
                    <p className="pr-4 font-bold text-right">
                      {chatbot.chat_sessions.length} sessions
                    </p>
                  </div>
                </div>
              }
              className="px-10 py-5"
            >
              {hadSessions ? (
                <>
                  {chatbot.chat_sessions.map((session) => (
                    <Button
                      as={Link}
                      variant="flat"
                      color="primary"
                      href={`/review-sessions/${session.id}`}
                      key={session.id}
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
                  ))}
                </>
              ) : (
                <p>No sessions found</p>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default ChatbotSessions;
