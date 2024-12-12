'use client';

import { BASE_URL } from '@/graphql/apolloClient';
import { useEffect, useState } from 'react';
import { Snippet } from '@nextui-org/snippet';
import { toast } from 'sonner';
import { Button } from '@nextui-org/button';
import { X } from 'lucide-react';
import Avatar from '@/components/Avatar';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CHATBOT_BY_ID } from '@/graphql/queries/queries';
import { GetChatbotByIdResponse, GetChatbotByIdVariables } from '@/types';
import { Input } from '@nextui-org/input';
import Characteristic from '@/components/Characteristic';
import {
  ADD_CHARACTERISTIC,
  DELETE_CHATBOT,
  UPDATE_CHATBOT,
} from '@/graphql/mutations/mutations';
import { redirect } from 'next/navigation';
import { Spinner } from '@nextui-org/spinner';

const EditChatbot = ({ id }: { id: string }) => {
  const [url, setUrl] = useState<string>('');
  const [chatbotName, setChatbotName] = useState<string>('');
  const [newCharacteristic, setNewCharacteristic] = useState<string>('');

  const { data, loading, error } = useQuery<
    GetChatbotByIdResponse,
    GetChatbotByIdVariables
  >(GET_CHATBOT_BY_ID, {
    variables: {
      id,
    },
  });

  const [updateChatbot, { loading: updateChatbotLoading }] = useMutation(
    UPDATE_CHATBOT,
    {
      variables: {
        id,
        name: chatbotName,
      },
      refetchQueries: ['GetChatbotById'],
    }
  );

  const [addCharacteristic, { loading: addCharacteristicLoading }] =
    useMutation(ADD_CHARACTERISTIC, {
      variables: {
        chatbotId: id,
        content: newCharacteristic,
        created_at: new Date().toISOString(),
      },
      refetchQueries: ['GetChatbotById'],
    });

  const [deleteChatbot] = useMutation(DELETE_CHATBOT, {
    variables: {
      id,
    },
    refetchQueries: ['GetChatbotById'],
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    if (data) {
      setChatbotName(data.chatbots.name);
    }
  }, [data]);

  useEffect(() => {
    const url = `${BASE_URL}/chatbot/${id}`;
    setUrl(url);
  }, [id]);

  const handleAddCharacteristic = async () => {
    try {
      const promise = addCharacteristic();

      toast.promise(promise, {
        loading: 'Adding characteristic...',
        success: 'Characteristic added successfully',
        error: 'Error adding characteristic',
      });
    } catch (err) {
      console.error('Failed to add characteristic', err);
    }
  };

  const handleUpdateChatbot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const promise = updateChatbot();

      toast.promise(promise, {
        loading: 'Updating chatbot...',
        success: 'Chatbot updated successfully',
        error: 'Error updating chatbot',
      });
    } catch (error) {
      console.error('Error updating chatbot:', error);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this chatbot? This action cannot be undone.'
    );

    if (!isConfirmed) return;

    try {
      const promise = deleteChatbot();

      toast.promise(promise, {
        loading: 'Deleting chatbot...',
        success: 'Chatbot deleted successfully',
        error: 'Error deleting chatbot',
      });
    } catch (error) {
      console.error('Error deleting chatbot:', error);
      toast.error('Error deleting chatbot');
    }
  };

  if (loading) {
    return (
      <div className="relative md:top-1/2 md:left-1/2 md:mt-0 mt-10 h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  if (!data?.chatbots) return redirect('/view-chatbots');

  return (
    <div className="px-0 md:p-10">
      <div className="md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2 md:border p-5 rounded-b-lg md:rounded-lg bg-[#2991EE]">
        <h2 className="text-white text-sm font-bold">Link to Chat</h2>
        <p className="text-sm italic text-white">
          Share this link with your users to start conversations with your
          chatbot
        </p>
        <Snippet
          variant="solid"
          tooltipProps={{
            color: 'foreground',
            placement: 'top-start',
            className: 'bg-black px-2',
          }}
          onCopy={() => {
            toast.success('Copied to clipboard');
          }}
        >
          {url}
        </Snippet>
      </div>

      <section className="relative mt-5 bg-white p-8 md:p-10 rounded-lg">
        <Button
          isIconOnly
          color="danger"
          size="sm"
          radius="sm"
          className="absolute top-2 right-2"
          onPress={() => handleDelete()}
        >
          {<X className="size-5" />}
        </Button>

        <div className="flex space-x-4">
          <Avatar seed={chatbotName} />

          <form
            onSubmit={handleUpdateChatbot}
            className="flex flex-1 space-x-2 items-center"
          >
            <Input
              value={chatbotName}
              onChange={(e) => setChatbotName(e.target.value)}
              variant="underlined"
              required
              errorMessage="Chatbot name is required"
            />
            <Button
              type="submit"
              radius="sm"
              color="primary"
              isLoading={updateChatbotLoading}
            >
              {updateChatbotLoading ? 'Updating...' : 'Update'}
            </Button>
          </form>
        </div>

        <h2 className="text-xl font-bold mt-10">Here is what your AI knows:</h2>
        <p>
          Your chatbot is equipped with the following information to assist you
          in your conversation with your users
        </p>

        <div className="bg-gray-200 p-5 rounded-md mt-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCharacteristic();
              setNewCharacteristic('');
            }}
            className="flex space-x-2 mb-5"
          >
            <Input
              type="text"
              label="Add a characteristic"
              value={newCharacteristic}
              size="sm"
              onChange={(e) => setNewCharacteristic(e.target.value)}
              required
              errorMessage="Characteristic is required"
            />
            <Button
              type="submit"
              radius="sm"
              color="primary"
              isLoading={addCharacteristicLoading}
            >
              {addCharacteristicLoading ? 'Adding...' : 'Add'}
            </Button>
          </form>

          <ul className="flex flex-wrap-reverse gap-5">
            {data?.chatbots?.chatbot_characteristics?.map((characteristic) => (
              <Characteristic
                key={characteristic.id}
                characteristic={characteristic}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default EditChatbot;
