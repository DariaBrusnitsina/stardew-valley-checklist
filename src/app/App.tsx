import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import data from '../../database.json';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import HomePage from '../pages/HomePage/HomePage';
import RoomPage from '../pages/RoomPage/RoomPage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div id="app">
      <Navbar onToggle={() => setSidebarOpen((prev) => !prev)} />
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(false)} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {data.bundles[0].rooms.map((room) => (
          <Route path={room.name} element={<RoomPage room={room} />} />
        ))}
        {data.bundles[1].rooms.map((room) => (
          <Route path={room.name} element={<RoomPage room={room} />} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
