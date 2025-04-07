import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

type RoomContextType = {
  completedTasks: Record<string, number>;
  updateCompletedRoom: () => void;
};

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [completedTasks, setCompletedTasks] = useState({
    Crafts_Room: 0,
    Pantry: 0,
    Fish_Tank: 0,
    Boiler_Room: 0,
    Bulletin_Board: 0,
    Vault: 0,
    Abandoned_JojaMart: 0,
  });

  const updateCompletedRoom = useCallback(() => {
    Object.keys(completedTasks).forEach((key) => {
      const completedBundles = Object.entries(localStorage).filter(
        (localStorageKey) =>
          localStorageKey[0].startsWith(`room-${key}`) && localStorageKey[1] === 'true'
      ).length;

      setCompletedTasks((prev) => ({
        ...prev,
        [key]: completedBundles,
      }));
    });
  }, [completedTasks]);

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
