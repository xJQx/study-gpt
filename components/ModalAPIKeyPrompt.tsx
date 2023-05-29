import { Modal, ModalProps } from '@/components/Modal';
import React, { useState } from 'react';

interface ModalAPIKeyProps {
  useDisclosure: ModalProps['useDisclosure'],
  submitKey: (key: string) => void;
}

export const ModalAPIKeyPrompt = ({ useDisclosure, submitKey }: ModalAPIKeyProps) => {
  const [key, setKey] = useState('');

  return (
    <Modal
      useDisclosure={useDisclosure}
      title="Enter your OpenAI Key"
      button={{
        label: 'Continue',
        onClick: () => submitKey(key)
      }}
    >
      <input
        value={key}
        onChange={e => setKey(e.target.value)}
        type="text"
        className='border-2 rounded w-full p-2'
        required
      />
    </Modal>
  );
};
