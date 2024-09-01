import { create } from 'zustand';

type Store = {
  activeAppId: string | null;
  setActiveAppId: (id: string | null) => void;
};

export const useActiveApp = create<Store>()((set) => ({
  activeAppId: null,
  setActiveAppId: (id) => set({ activeAppId: id }),
}));
