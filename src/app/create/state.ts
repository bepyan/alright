import { create } from 'zustand';

interface CreateProps {
  step: number;
  moveStep: (ac: number) => void;
}

export const useCreate = create<CreateProps>((set) => ({
  step: 1,
  moveStep: (ac) => set((state) => ({ ...state, step: state.step + ac })),
}));
