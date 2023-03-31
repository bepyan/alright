import { create } from 'zustand';

import { ParkingLotInfo } from '~/models/alright';
import { KPlace } from '~/types';

interface CreateProps {
  step: number;
  company?: KPlace;
  selectedCarParkList: ParkingLotInfo[];
  computed: {
    canMoveToNext: boolean;
  };
  moveStep: (ac: number) => void;
  resetState: () => void;
  selectCompany: (company?: KPlace) => void;
  selectCarPark: (place: KPlace) => void;
  removeCarPark: (place: KPlace) => void;
  updateCarPark: (place: KPlace) => void;
}

export const useCreate = create<CreateProps>((set, get) => ({
  step: 1,
  selectedCarParkList: [],
  computed: {
    get canMoveToNext() {
      if (get().step === 1) {
        return Boolean(get().company);
      } else if (get().step === 2) {
        return Boolean(get().selectedCarParkList.length > 0);
      }

      return true;
    },
  },
  moveStep: (ac) => set((state) => ({ ...state, step: state.step + ac })),
  resetState: () => set(() => ({ step: 1, company: undefined, selectedCarParkList: [] })),
  selectCompany: (company) => set((state) => ({ ...state, company })),
  selectCarPark: (place) =>
    set((state) => ({
      ...state,
      selectedCarParkList: [...state.selectedCarParkList, place],
    })),
  updateCarPark: (place) =>
    set((state) => ({
      ...state,
      selectedCarParkList: state.selectedCarParkList.map((v) => (v.id === place.id ? place : v)),
    })),
  removeCarPark: (place) =>
    set((state) => ({
      ...state,
      selectedCarParkList: state.selectedCarParkList.filter((v) => v.id !== place.id),
    })),
}));
