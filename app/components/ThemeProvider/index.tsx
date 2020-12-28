import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../assets/theme';

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ThemeProvider;
