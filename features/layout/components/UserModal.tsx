import { Modal, ModalProps } from '@/components/Modal';
import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/common/config/FirebaseService';
import { Input, InputGroup } from '@chakra-ui/react';
import { Button } from '@/components';

interface UserModalProps {
  useDisclosure: ModalProps['useDisclosure'];
  currUser: any;
}
// need to logout

export const UserModal = ({ useDisclosure, currUser }: UserModalProps) => {
  const [apiKey, setApiKey] = useState<string | null>('');
  // const [isEditing,setIsEditing] = useState<boolean>(false);
  useEffect(() => {
    if (!(localStorage.getItem('apiKey') === null)) {
      setApiKey(localStorage.getItem('apiKey'));
    }
  }, []);

  const saveApiKey = () => {
    localStorage.setItem('apiKey', apiKey ? apiKey : '');
  };

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
      <div>
        <span className="font-semibold">API Key: </span>
        <span>
          <InputGroup size="md">
            <Input
              placeholder="Enter your OpenAI API key"
              value={apiKey ? apiKey : ''}
              onChange={e => {
                setApiKey(e.target.value);
              }}
            />
            <Button
              colorScheme="blue"
              onClick={() => {
                saveApiKey();
              }}
            >
              Save
            </Button>
          </InputGroup>
        </span>
      </div>
    </Modal>
  );
};
