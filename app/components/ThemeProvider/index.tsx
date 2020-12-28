import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { light, dark } from '../../assets/theme';
import { selectTheme } from './themeSlice';

interface Props {
  children: React.ReactNode;
  //@TODO: Type theme
  theme?: any;
}

export const ThemeProvider = ({ children, theme }: Props) => {
  const currentTheme = useSelector(selectTheme);

  let selectedTheme;
  switch (currentTheme) {
    case 'dark':
      selectedTheme = dark;
      break;
    case 'light':
    default:
      selectedTheme = light;
      break;
  }

  return (
    <StyledThemeProvider theme={theme ?? selectedTheme}>
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
