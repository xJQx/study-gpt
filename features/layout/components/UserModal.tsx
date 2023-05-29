import { Modal, ModalProps } from '@/components/Modal';
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/common/config/FirebaseService';

interface UserModalProps {
  useDisclosure: ModalProps['useDisclosure'];
  currUser: any;
}
// need to logout

export const UserModal = ({ useDisclosure, currUser }: UserModalProps) => {
  const logoutUser = async () => {
    signOut(auth)
      .then(() => {
        useDisclosure.onClose();
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  return (
    <Modal
      useDisclosure={useDisclosure}
      title="Settings"
      button={{
        label: 'Logout',
        onClick: () => {
          logoutUser();
        }
      }}
    >
      <div>
        <span className="font-semibold">Name: </span>
        <span>{currUser ? <>{currUser.displayName}</> : <></>}</span>
      </div>
      <div>
        <span className="font-semibold">Email: </span>
        <span>{currUser ? <>{currUser.email}</> : <></>}</span>
      </div>
    </Modal>
  );
};
