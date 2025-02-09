'use client';

import { Button } from '@heroui/button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/modal';
import { X } from 'lucide-react';

export const ModalComponent = ({
  handleDelete,
}: {
  handleDelete: () => void;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        color="danger"
        size="sm"
        radius="sm"
        className="absolute top-2 right-2"
        onPress={onOpen}
      >
        {<X className="size-5" />}
      </Button>
      <Modal
        size="lg"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                delete chatbot
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this chatbot?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  variant="bordered"
                  onPress={handleDelete}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
