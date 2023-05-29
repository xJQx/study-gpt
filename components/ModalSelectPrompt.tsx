import { Modal, ModalProps } from '@/components/Modal';
import React from 'react';

interface ModalSelectPromptProps {
  useDisclosure: ModalProps['useDisclosure'];
  promptList: Array<{
    title: string;
    // other attributes
  }>;
}

export const ModalSelectPrompt = ({
  useDisclosure,
  promptList
}: ModalSelectPromptProps) => {
  return (
    <Modal
      useDisclosure={useDisclosure}
      title="Select Prompts"
      button={{
        label: 'close',
        onClick: () => useDisclosure.onClose()
      }}
    >
      <div>
        {promptList.map(prompt => (
          <div
            key={prompt.title}
            className="text-black hover:text-brand-red"
            onClick={() => {
              console.log(`${prompt.title} selected`);
              useDisclosure.onClose();
            }}
          >
            {prompt.title}
          </div>
        ))}
      </div>
    </Modal>
  );
};
