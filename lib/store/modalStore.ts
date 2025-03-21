import { create } from "zustand";

interface ModalStore {
  isLoginOpen: boolean;
  setIsLoginOpen: (isLoginOpen: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isLoginOpen: false,
  setIsLoginOpen: (isLoginOpen) => set({ isLoginOpen }),
}));
