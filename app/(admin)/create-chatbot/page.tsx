'use client';

import { useState } from 'react';
import Avatar from '@/components/Avatar';
import { CREATE_CHATBOT } from '@/graphql/mutations';
import { useMutation } from '@apollo/client';
import { useUser } from '@clerk/nextjs';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { useRouter } from 'next/navigation';
import { Alert } from '@heroui/alert';
import { Spinner } from '@heroui/spinner';

const CeateChatbot = () => {
  const { user, isLoaded } = useUser();
  const [name, setName] = useState('');
  const router = useRouter();

  const [createChatbot, { data, loading, error }] = useMutation(
    CREATE_CHATBOT,
    {
      variables: {
        clerk_user_id: user?.id,
        name,
      },
    }
  );

  if (!isLoaded) {
    return (
      <Spinner className="relative md:top-1/2 md:left-1/2 md:mt-0 mt-10" />
    );
  }

  if (!user)
    return (
      <div className="relative md:top-1/4 md:left-1/2 md:mt-0 mt-10">
        <Alert
          title="Unauthorized"
          description={'Please Sign In to Create a Chatbot'}
          color={'danger'}
          variant={'faded'}
        />
      </div>
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await createChatbot();
      setName('');

      router.push(`/edit-chatbot/${result.data.createChatbot.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:space-x-10 bg-white p-10 rounded-md border border-default-200 dark:border-default-100 m-10 dark:bg-[#17171a]">
      <Avatar seed="create-chatboot" />
      <div>
        <h1 className="text-xl lg-text-3xl font-semibold">Create</h1>
        <h2 className="font-light">
          Create a new chatbot to assist you in your conversations
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center gap-3 mt-5"
      >
        <Input
          type="text"
          label="Chatbot Name"
          size="sm"
          variant="bordered"
          required
          minLength={3}
          errorMessage={'Name must be at least 3 characters'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          type="submit"
          className="px-8"
          radius="sm"
          color="primary"
          isLoading={loading}
        >
          {loading ? 'Creating' : 'Create Chatbot'}
        </Button>
      </form>
    </div>
  );
};
export default CeateChatbot;
