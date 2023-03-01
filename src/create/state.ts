import { create } from 'zustand';

import { Place } from '~/types/place';

interface CreateProps {
  step: number;
  company?: Place;
  selectedCarParkList: Place[];
  computed: {
    canMoveToNext: boolean;
  };
  moveStep: (ac: number) => void;
  selectCompany: (company?: Place) => void;
  selectCarPark: (place: Place) => void;
  removeCarPark: (place: Place) => void;
}

export const useCreate = create<CreateProps>((set, get) => ({
  step: 1,
  selectedCarParkList: [],
  computed: {
    get canMoveToNext() {
      if (get().step === 1) {
        return Boolean(get().company);
      }

      return true;
    },
  },
  moveStep: (ac) => set((state) => ({ ...state, step: state.step + ac })),
  selectCompany: (company) => set((state) => ({ ...state, company })),
  selectCarPark: (place) =>
    set((state) => ({
      ...state,
      selectedCarParkList: [...state.selectedCarParkList, place],
    })),
  removeCarPark: (place) =>
    set((state) => ({
      ...state,
      selectedCarParkList: state.selectedCarParkList.filter((v) => v.id !== place.id),
    })),
}));
