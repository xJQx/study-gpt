import { Modal, ModalProps } from '@/components/Modal';
import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebaseService';
import { Input, InputGroup } from '@chakra-ui/react';
import { Button } from '@/components';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

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
        <div className="flex flex-col gap-1">
          {/* Name */}
          <div>
            <span className="font-semibold">Name: </span>
            <span>{currUser ? <>{currUser.displayName}</> : <></>}</span>
          </div>

          {/* Email */}
          <div>
            <span className="font-semibold">Email: </span>
            <span>{currUser ? <>{currUser.email}</> : <></>}</span>
          </div>

          {/* API Key */}
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

          {/* History */}
          <div className="mt-1">
            <Link
              href="/history"
              onClick={() => useDisclosure.onClose()}
              className="underline text-[14px] hover:text-brand-red"
            >
              View History
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};
