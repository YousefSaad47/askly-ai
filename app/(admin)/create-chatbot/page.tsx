'use client';

import { useState } from 'react';
import Avatar from '@/components/Avatar';
import { CREATE_CHATBOT } from '@/graphql/mutations/mutations';
import { useMutation } from '@apollo/client';
import { useUser } from '@clerk/nextjs';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useRouter } from 'next/navigation';

const CeateChatbot = () => {
  const { user } = useUser();
  const [name, setName] = useState('');
  const router = useRouter();

  const [createChatbot, { data, loading, error }] = useMutation(
    CREATE_CHATBOT,
    {
      variables: {
        clerk_user_id: user?.id,
        name,
        created_at: new Date().toISOString(),
      },
    }
  );

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await createChatbot();
      setName('');

      router.push(`/edit-chatbot/${result.data.insertChatbots.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:space-x-10 bg-white p-10 rounded m-10">
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
          required
          minLength={3}
          errorMessage={'Name must be at least 3 characters'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" className="px-8" radius="sm" isLoading={loading}>
          {loading ? 'Creating' : 'Create Chatbot'}
        </Button>
      </form>
    </div>
  );
};
export default CeateChatbot;
