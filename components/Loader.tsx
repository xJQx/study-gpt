import { Container, Spinner } from '@chakra-ui/react';
import React from 'react';

interface LoaderProps {
  text: string;
}
export const Loader = ({ text }: LoaderProps) => {
  return (
    <Container
      style={{
        margin: '0px auto',
        padding: '20px',
        background: 'transparent',
        display: 'grid'
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: '12px'
        }}
      >
        {text ? <>{text}</> : <>Loading ...</>}
      </h1>
      <Spinner color="red.500" style={{ margin: '0 auto' }} />
    </Container>
  );
};
