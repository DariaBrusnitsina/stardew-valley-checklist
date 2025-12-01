import { useCallback, useState } from 'react';

import { Navbar } from '@/widgets/navbar';
import { Sidebar } from '@/widgets/sidebar';

import { AppRouter } from './router/AppRouter';

export const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div id="app">
      <Navbar onToggle={handleToggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onToggle={handleCloseSidebar} />
      <AppRouter />
    </div>
  );
};
