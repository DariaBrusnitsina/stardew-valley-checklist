import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

import { ROOM_NAMES, type RoomName } from '@/shared/constants';
import { localStorageKeys, localStorageUtils } from '@/shared/lib/localStorage';

type RoomContextType = {
  completedTasks: Record<RoomName, number>;
  updateCompletedRoom: () => void;
};

const RoomContext = createContext<RoomContextType | undefined>(undefined);

const initialCompletedTasks = ROOM_NAMES.reduce(
  (acc, roomName) => {
    acc[roomName] = 0;
    return acc;
  },
  {} as Record<RoomName, number>
);

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [completedTasks, setCompletedTasks] =
    useState<Record<RoomName, number>>(initialCompletedTasks);

  const updateCompletedRoom = useCallback(() => {
    const updated: Record<RoomName, number> = { ...initialCompletedTasks };

    ROOM_NAMES.forEach((roomName) => {
      const prefix = localStorageKeys.getRoomBundleKey(roomName, '');
      updated[roomName] = localStorageUtils.getCompletedCount(prefix);
    });

    setCompletedTasks(updated);
  }, []);

  useEffect(() => {
    updateCompletedRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RoomContext.Provider value={{ completedTasks, updateCompletedRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider');
  }
  return context;
};
