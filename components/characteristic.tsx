'use client';

import { REMOVE_CHARACTERISTIC } from '@/graphql/mutations';
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
    refetchQueries: ['GetChatbotById', 'GetChatbotCharacteristicsPaginated'],
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
    <div className="no-underline p-10 hover:opacity-80 active:opacity-disabled z-0 group relative inline-flex items-center justify-center box-border appearance-none subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent border-default data-[hover=true]:opacity-hover group text-sm border-dashed font-normal text-default-600 data-[hover=true]:bg-default-100/50">
      <p className="font-normal text-medium text-default-500">
        {characteristic.content}
      </p>

      <Trash2
        className="absolute top-1 right-1 text-danger cursor-pointer"
        onClick={handleRemoveCharacteristic}
      />
    </div>
  );
};
export default Characteristic;
