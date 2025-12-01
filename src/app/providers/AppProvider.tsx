import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';

import { RoomProvider } from '@/entities/room';

import { ThemeProvider } from '@/shared/lib/themeContext';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <HelmetProvider>
      <HashRouter>
        <ThemeProvider>
          <RoomProvider>{children}</RoomProvider>
        </ThemeProvider>
      </HashRouter>
    </HelmetProvider>
  );
};
