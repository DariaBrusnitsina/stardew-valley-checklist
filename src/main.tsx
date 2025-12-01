import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './app/i18n';
import './app/styles/main.scss';
import { App } from './app/App';
import { AppProvider } from './app/providers/AppProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
