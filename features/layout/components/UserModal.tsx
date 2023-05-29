import { Modal, ModalProps } from '@/components/Modal';
import React from 'react';

interface UserModalProps {
  useDisclosure: ModalProps['useDisclosure'];
}

export const UserModal = ({ useDisclosure }: UserModalProps) => {
  return (
    <Modal
      useDisclosure={useDisclosure}
      title="Settings"
      button={{
        label: 'Logout',
        onClick: () => {
          console.log('logout');
          useDisclosure.onClose();
        }
      }}
    >
      <div>
        <span className="font-semibold">Name: </span>
        <span>Tom</span>
      </div>
      <div>
        <span className="font-semibold">Email: </span>
        <span>tom@gmail.com</span>
      </div>
    </Modal>
  );
};
