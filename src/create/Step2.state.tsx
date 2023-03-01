import { create } from 'zustand';

import { Place } from '~/types/place';

export const useCarParkDetail = create<{
  targetPlace?: Place;
  computed: { show: boolean };
  showCarParkDetail: (targetPlace: Place) => void;
  hideCarParkDetail: () => void;
}>((set, get) => ({
  computed: {
    get show() {
      return Boolean(get().targetPlace);
    },
  },
  showCarParkDetail: (targetPlace) => {
    document.body.style.overflow = 'hidden';
    set((state) => ({ ...state, targetPlace }));
  },
  hideCarParkDetail: () => {
    document.body.style.overflow = '';
    set((state) => ({ ...state, targetPlace: undefined }));
  },
}));

export const useCarParkSearch = create<{
  show: boolean;
  showCarParkSearch: () => void;
  hideCarParkSearch: () => void;
}>((set) => ({
  show: false,
  showCarParkSearch: () => {
    document.body.style.overflow = 'hidden';
    set((state) => ({ ...state, show: true }));
  },
  hideCarParkSearch: () => {
    document.body.style.overflow = '';
    set((state) => ({ ...state, show: false }));
  },
}));
