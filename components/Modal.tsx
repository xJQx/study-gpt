import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react';
import { Button } from './Button';

export interface ModalProps {
  useDisclosure: {
    isOpen: boolean;
    onClose: () => void;
  };
  title: string;
  children?: React.ReactNode | 'string';
  button: {
    label: string;
    onClick: () => void;
  };
}

export const Modal = (props: ModalProps) => {
  const {
    useDisclosure: { isOpen, onClose },
    title,
    children,
    button
  } = props;

  return (
    <>
      <ChakraModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent marginX="16px">
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={button.onClick}>
              {button.label}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
};
