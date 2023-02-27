import { create } from 'zustand';

interface CreateProps {
  step: number;
  company?: { name: string };
  computed: {
    canMoveToNext: boolean;
  };
  moveStep: (ac: number) => void;
  selectCompany: (tmp: string) => void;
}

export const useCreate = create<CreateProps>((set, get) => ({
  step: 1,
  computed: {
    get canMoveToNext() {
      if (get().step === 1) {
        return Boolean(get().company);
      }

      return true;
    },
  },
  moveStep: (ac) => set((state) => ({ ...state, step: state.step + ac })),
  selectCompany: (tmp) => set((state) => ({ ...state, company: { name: tmp } })),
}));
