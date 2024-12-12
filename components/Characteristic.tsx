'use client';

import { REMOVE_CHARACTERISTIC } from '@/graphql/mutations/mutations';
import { ChatbotCharacteristic } from '@/types';
import { useMutation } from '@apollo/client';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const Characteristic = ({
  characteristic,
}: {
  characteristic: ChatbotCharacteristic;
}) => {
  const [removeCharacteristic] = useMutation(REMOVE_CHARACTERISTIC, {
    variables: {
      characteristic_id: characteristic.id,
    },
    refetchQueries: ['GetChatbotById'],
  });

  const handleRemoveCharacteristic = async () => {
    try {
      const promise = removeCharacteristic();

      toast.promise(promise, {
        loading: 'Removing characteristic...',
        success: 'Characteristic removed successfully',
        error: 'Error removing characteristic',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className="relative p-10 bg-white border rounded-md">
      {characteristic.content}

      <Trash2
        className="size-5 text-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50"
        onClick={handleRemoveCharacteristic}
      />
    </li>
  );
};
export default Characteristic;
