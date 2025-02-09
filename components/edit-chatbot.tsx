'use client';

import { BASE_URL } from '@/constants';
import { useEffect, useState } from 'react';
import { Snippet } from '@heroui/snippet';
import { toast } from 'sonner';
import { Button } from '@heroui/button';
import Avatar from '@/components/avatar';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CHATBOT_BY_ID } from '@/graphql/queries';
import { GetChatbotByIdResponse, GetChatbotByIdVariables } from '@/types';
import { Input } from '@heroui/input';
import { Divider } from '@heroui/divider';
import Characteristic from '@/components/characteristic';
import {
  ADD_CHARACTERISTIC,
  DELETE_CHATBOT,
  UPDATE_CHATBOT,
} from '@/graphql/mutations';
import { redirect } from 'next/navigation';
import { Spinner } from '@heroui/spinner';
import { ModalComponent } from './modal';

const EditChatbot = ({ id }: { id: string }) => {
  const [url, setUrl] = useState('');
  const [chatbotName, setChatbotName] = useState('');
  const [newCharacteristic, setNewCharacteristic] = useState('');

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

  const [addChatbotCharacteristic, { loading: addCharacteristicLoading }] =
    useMutation(ADD_CHARACTERISTIC, {
      variables: {
        chatbotId: id,
        content: newCharacteristic,
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
      setChatbotName(data.getChatbotById.name);
    }
  }, [data]);

  useEffect(() => {
    const url = `${BASE_URL}/chatbot/${id}`;
    setUrl(url);
  }, [id]);

  const handleAddCharacteristic = async () => {
    try {
      const promise = addChatbotCharacteristic();

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
      <Spinner className="relative md:top-1/2 md:left-1/2 md:mt-0 mt-10" />
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  if (!data?.getChatbotById) return redirect('/view-chatbots');

  return (
    <div className="px-0 md:p-10">
      <div className="md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2 border-t md:border p-5 rounded-b-lg md:rounded-lg  dark:bg-black border-default-200 dark:border-default-100">
        <strong>Link to Chat</strong>
        <p className="text-sm italic text-default-600 dark:text-default-500">
          Share this link with your users to start conversations with your
          chatbot
        </p>
        <Snippet
          variant="flat"
          symbol={false}
          color="primary"
          tooltipProps={{
            placement: 'top-start',
            className: 'bg-[#17171a] p-2 rounded-full',
          }}
          onCopy={() => {
            toast.success('Copied to clipboard');
          }}
        >
          <span
            style={{
              whiteSpace: 'normal',
              overflowWrap: 'anywhere',
            }}
          >
            {url}
          </span>
        </Snippet>
      </div>

      <Divider className="my-4 w-11/12 mx-auto" />

      <section className="relative mt-5 bg-white p-8 md:p-10 rounded-lg dark:bg-[#17171a] border border-default-200 dark:border-default-100">
        <ModalComponent handleDelete={handleDelete} />

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
              errorMessage="Name must be at least 3 characters"
              minLength={3}
              maxLength={50}
            />
            <Button
              type="submit"
              radius="sm"
              color="primary"
              isLoading={updateChatbotLoading}
            >
              {updateChatbotLoading ? 'Updating' : 'Update'}
            </Button>
          </form>
        </div>

        <h2 className="text-xl font-bold mt-10">Here is what your AI knows:</h2>
        <p className="text-sm italic mt-2 text-default-600 dark:text-default-500">
          Your chatbot is equipped with the following information to assist you
          in your conversation with your users
        </p>

        <div className="p-5 rounded-md mt-5 border border-default-200 dark:border-default-100">
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
              {addCharacteristicLoading ? 'Adding' : 'Add'}
            </Button>
          </form>

          <ul className="flex flex-wrap-reverse gap-5">
            {data?.getChatbotById?.chatbot_characteristics?.map(
              (characteristic) => (
                <Characteristic
                  key={characteristic.id}
                  characteristic={characteristic}
                />
              )
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default EditChatbot;
