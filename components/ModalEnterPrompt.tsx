import { Modal, ModalProps } from '@/components/Modal';
import React from 'react';

interface ModalEnterPromptProps {
  useDisclosure: ModalProps['useDisclosure'];
}

export const ModalEnterPrompt = ({ useDisclosure }: ModalEnterPromptProps) => {
  return (
    <Modal
      useDisclosure={useDisclosure}
      title="Enter Prompts"
      button={{
        label: 'close',
        onClick: () => useDisclosure.onClose()
      }}
    >
      <div>{/* TODO: Implementation here */}</div>
    </Modal>
  );
};
