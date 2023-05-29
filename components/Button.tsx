import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps
} from '@chakra-ui/react';
import React from 'react';

interface ButtonPrps extends ChakraButtonProps {
  children?: React.ReactNode;
}

export const Button = (props: ButtonPrps) => {
  const { children, ...buttonProps } = props;

  return (
    <ChakraButton
      {...buttonProps}
      className="!bg-brand-pink hover:!bg-brand-red text-white !rounded"
    >
      {children}
    </ChakraButton>
  );
};
