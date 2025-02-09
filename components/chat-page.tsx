'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  GET_CHATBOT_BY_ID,
  GET_MESSAGES_BY_CHAT_SESSION_ID,
} from '@/graphql/queries';
import { Button } from '@heroui/button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/modal';
import { Input } from '@heroui/input';
import { Icons } from '@/components/ui/icons';
import { startNewChat } from '@/lib/start-new-chat';
import Avatar from '@/components/avatar';
import Messages from '@/components/messages';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  GetChatbotByIdResponse,
  GetChatSessionByIdVariables,
  GetMessagesByChatSessionIdResponse,
  GetMessagesByChatSessionIdVariables,
  Message,
} from '@/types';

const messageSchema = z.object({
  message: z.string().min(2, 'Message must be at least 3 characters'),
});

export default function ChatPage({ id }: { id: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({
    defaultOpen: true,
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [chatId, setChatId] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: '',
    },
  });

  const { data: chatbotData } = useQuery<
    GetChatbotByIdResponse,
    GetChatSessionByIdVariables
  >(GET_CHATBOT_BY_ID, {
    variables: { id },
  });

  const { data: messagesData } = useQuery<
    GetMessagesByChatSessionIdResponse,
    GetMessagesByChatSessionIdVariables
  >(GET_MESSAGES_BY_CHAT_SESSION_ID, {
    variables: { id: chatId },
    skip: !chatId,
  });

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData.getChatSessionById.messages);
    }
  }, [messagesData]);

  const handleSubmitInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newChatId = await startNewChat(name, email, id);
    setChatId(newChatId);
    setLoading(false);
    onClose();
  };

  const onSubmit = async (formData: z.infer<typeof messageSchema>) => {
    const { message } = formData;
    reset();

    if (!name || !email) {
      onOpen();
      return;
    }

    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      created_at: new Date().toISOString(),
      chat_session_id: chatId,
      sender: 'user',
    };

    const loadingMessage: Message = {
      id: Date.now().toString() + '-loading',
      content: 'Thinking...',
      created_at: new Date().toISOString(),
      chat_session_id: chatId,
      sender: 'ai',
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      loadingMessage,
    ]);

    try {
      const res = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          chat_session_id: chatId,
          chatbot_id: id,
          content: message,
        }),
      });
      const result = await res.json();

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === loadingMessage.id
            ? { ...msg, content: result.content, id: result.id }
            : msg
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <Modal
        size="lg"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmitInfo}>
              <ModalHeader className="flex flex-col gap-1">
                Let's help you out!
                <p>I need a few details to get started</p>
              </ModalHeader>
              <ModalBody>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                      label="Name"
                      labelPlacement="outside"
                      placeholder="John Doe"
                      id="name"
                      required
                      minLength={3}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                      type="email"
                      label="Email"
                      labelPlacement="outside"
                      placeholder="john.doe@gmail.com"
                      required
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary" variant="bordered">
                  {loading ? (
                    <Icons.spinner className="size-4 animate-spin" />
                  ) : (
                    'Continue'
                  )}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>

      <div className="flex flex-col w-full max-w-3xl mx-auto md:rounded-t-lg shadow-2xl md:mt-10">
        <div className="pb-4sticky top-0 z-50 bg-default py-5 px-10 text-white md:rounded-t-lg flex items-center space-x-4">
          <Avatar
            seed={chatbotData?.getChatbotById?.name!}
            className="size-12 bg-white rounded-full"
          />
          <div>
            <h1 className="truncate text-lg">
              {chatbotData?.getChatbotById?.name}
            </h1>
            <p className="text-sm text-gray-300">Typically replies instantly</p>
          </div>
        </div>
        <Messages
          messages={messages}
          chatbotName={chatbotData?.getChatbotById?.name!}
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center sticky bottom-0 z-50 space-x-4 drop-shadow-lg p-4 rounded-md"
        >
          <Input
            id="message"
            type="text"
            variant="bordered"
            radius="sm"
            label="Type a message"
            {...register('message')}
            minLength={2}
            required
            errorMessage={errors.message?.message}
          />
          <Button
            radius="sm"
            type="submit"
            color="secondary"
            variant="bordered"
          >
            {isSubmitting ? (
              <Icons.spinner className="size-4 animate-spin" />
            ) : (
              'Send'
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
