import { cn } from '@/lib/utils';
import { Message } from '@/types';
import { usePathname } from 'next/navigation';
import Avatar from './avatar';
import { UserCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';

interface MessagesProps {
  messages: Message[];
  chatbotName: string;
}

function Messages({ messages, chatbotName }: MessagesProps) {
  const path = usePathname();
  const isReviewPage = path.includes('review-sessions');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto space-y-10 py-10 px-5 rounded-lg">
      {messages?.map((message) => {
        const isSender = message.sender !== 'user';

        return (
          <div
            key={message.id}
            className={cn(
              'chat relative',
              isSender ? 'chat-start' : 'chat-end'
            )}
          >
            {isReviewPage && (
              <p className="absolute -bottom-5 text-xs text-default-600 dark:text-default-500">
                sent at {new Date(message.created_at).toLocaleString()}
              </p>
            )}
            <div className={cn('chat-image avatar w-10', !isSender && '-mr-4')}>
              {isSender ? (
                <Avatar
                  seed={chatbotName}
                  className="size-12 bg-white rounded-full border-2 border-primary"
                ></Avatar>
              ) : (
                <UserCircle className="text-primary" />
              )}
            </div>
            <div
              className={cn(
                'chat-bubble ',
                isSender ? 'bg-primary' : 'bg-default-500 dark:bg-default-200'
              )}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className="break-words"
                components={{
                  ul: (props) => (
                    <ul
                      {...props}
                      className="list-disc list-inside ml-5 mb-5"
                    />
                  ),
                  ol: (props) => (
                    <ol
                      {...props}
                      className="list-decimal list-inside ml-5 mb-5"
                    />
                  ),
                  h1: (props) => (
                    <h1 {...props} className="text-2xl font-bold mb-5" />
                  ),
                  h2: (props) => (
                    <h2 {...props} className="text-xl font-bold mb-5" />
                  ),
                  h3: (props) => (
                    <h3 {...props} className="text-lg font-bold mb-5" />
                  ),
                  table: (props) => (
                    <table
                      {...props}
                      className="table-auto w-full border-separate border-2 rounded-sm border-spacing-4 border-white mb-5"
                    />
                  ),
                  th: (props) => (
                    <th {...props} className="text-left underline" />
                  ),
                  p: (props) => (
                    <p
                      {...props}
                      className={cn(
                        'whitespace-break-spaces mb-5 text-white',
                        message.content === 'Thinking...' && 'animate-pulse'
                      )}
                    />
                  ),
                  a: (props) => (
                    <a
                      {...props}
                      className="font-bold underline hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        );
      })}
      <div ref={ref}></div>
    </div>
  );
}

export default Messages;
