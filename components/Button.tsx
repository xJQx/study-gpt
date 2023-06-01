import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps
} from '@chakra-ui/react';
import React from 'react';

interface ButtonProps extends ChakraButtonProps {
  secondary?: boolean;
  children?: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const { children, secondary = false, ...buttonProps } = props;

  const buttonClassName = secondary
    ? '!bg-gray-300 hover:!bg-gray-400 text-white !rounded'
    : '!bg-brand-pink hover:!bg-brand-red text-white !rounded';

  return (
    <ChakraButton {...buttonProps} className={buttonClassName}>
      {children}
    </ChakraButton>
  );
};
