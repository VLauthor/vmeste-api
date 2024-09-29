
import * as React from 'react';
import { Html, Text, Heading, Container, Tailwind } from '@react-email/components';

export const CodeVerified = ({ code }: { code: string }) => (
  <Html>
    <Tailwind>
      <Container>
        <Heading>Your verification code</Heading>
        <Text>Your verification code is: <strong>{code}</strong></Text>
      </Container>
    </Tailwind>
  </Html>
);