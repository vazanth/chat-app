import React from 'react';
import { Box, Alert, AlertIcon, AlertDescription, CloseButton } from '@chakra-ui/core';
export default function ErrorMessage(props: {message: string, close: () => void}) {
  return (
    <Box my={4}>
      <Alert status="error" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{props.message}</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" onClick={props.close}/>
      </Alert>
    </Box>
  );
}