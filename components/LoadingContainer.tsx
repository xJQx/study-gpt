import { Container, Spinner } from '@chakra-ui/react';
import React from 'react';

interface LoaderProps {
  text: string;
}
export const LoadingContainer = ({ text }: LoaderProps) => {
  return (
    <Container
      style={{
        margin: '10px auto',
        padding: '10px',
        background: '#eaeaea',
        display: 'grid'
      }}
    >
      <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>
        {text ? <>{text}</> : <>Loading ...</>}
      </h1>
      <Spinner color="red.500" style={{ margin: '0 auto' }} />
    </Container>
  );
};
