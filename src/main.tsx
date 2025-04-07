import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import '../src/app/i18n.js';

import './app/styles/main.scss';
import App from './app/App.tsx';
import { RoomProvider } from './hook/RoomContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <RoomProvider>
        <App />
      </RoomProvider>
    </HashRouter>
  </StrictMode>
);
