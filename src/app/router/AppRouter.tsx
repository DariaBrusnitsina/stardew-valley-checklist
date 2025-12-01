import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { getAllRooms } from '@/shared/lib/data';

// Lazy load pages for code splitting
const HomePage = lazy(() =>
  import('@/pages/home').then((module) => ({ default: module.HomePage }))
);
const RoomPage = lazy(() =>
  import('@/pages/room').then((module) => ({ default: module.RoomPage }))
);

// Loading fallback component
const PageLoader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
    }}
  >
    <div>Loading...</div>
  </div>
);

export const AppRouter = () => {
  const allRooms = getAllRooms();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {allRooms.map((room) => (
          <Route key={room.name} path={room.name} element={<RoomPage room={room} />} />
        ))}
      </Routes>
    </Suspense>
  );
};
