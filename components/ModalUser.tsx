import { Modal, ModalProps } from '@/components/Modal';
import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/FirebaseService';
import { Input, InputGroup } from '@chakra-ui/react';
import { Button } from '@/components';
import { toast, Toaster } from 'react-hot-toast';

interface ModalUserProps {
  useDisclosure: ModalProps['useDisclosure'];
  currUser: any;
}

export const ModalUser = ({ useDisclosure, currUser }: ModalUserProps) => {
  const [apiKey, setApiKey] = useState<string | null>('');

  useEffect(() => {
    if (!(localStorage.getItem('apiKey') === null)) {
      setApiKey(localStorage.getItem('apiKey'));
    }
  }, []);

  const saveApiKey = () => {
    localStorage.setItem('apiKey', apiKey ? apiKey : '');
    useDisclosure.onClose();
    toast.success('API Key saved.');
  };

  const logoutUser = async () => {
    signOut(auth)
      .then(() => {
        useDisclosure.onClose();
        toast.success('Logout successful.');
      })
      .catch(error => {
        console.log('error', error);
        toast.error('Failed to logout. Please try again.');
      });
  };
  return (
    <>
      <Toaster />
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
                marginLeft="4px"
              >
                Save
              </Button>
            </InputGroup>
          </span>
        </div>
      </Modal>
    </>
  );
};
