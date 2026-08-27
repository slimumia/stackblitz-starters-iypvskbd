import { create } from 'zustand';

interface AppState {
  activeTab: 'briefing' | 'radar' | 'receipt';
  activeDay: number;
  setActiveTab: (tab: 'briefing' | 'radar' | 'receipt') => void;
  setActiveDay: (day: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'briefing',
  activeDay: 2, // 預設天數
  setActiveTab: (tab) => set({ activeTab: tab }),
  setActiveDay: (day) => set({ activeDay: day }),
}));
