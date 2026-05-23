import { create } from "zustand";

type UIState = {
  isMembershipOpen: boolean;
  isAuthOpen: boolean;
  openMembership: () => void;
  closeMembership: () => void;
  openAuth: () => void;
  closeAuth: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  isMembershipOpen: false,
  isAuthOpen: false,
  openMembership: () => set({ isMembershipOpen: true }),
  closeMembership: () => set({ isMembershipOpen: false }),
  openAuth: () => set({ isAuthOpen: true }),
  closeAuth: () => set({ isAuthOpen: false }),
}));
