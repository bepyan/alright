import { create } from 'zustand';

import { CarParkDetail, Place } from '~/types';

interface CreateProps {
  company?: Place;
  carParkList: CarParkDetail[];
  selectedCarPark?: CarParkDetail;
  computed: {
    isShowCarParkDetail: boolean;
  };
  showCarParkDetail: (carPark: Place) => void;
  hideCarParkDetail: () => void;
}

export const useCarParkDetail = create<CreateProps>((set, get) => ({
  company: undefined,
  carParkList: [],
  computed: {
    get isShowCarParkDetail() {
      return Boolean(get().selectedCarPark);
    },
  },
  showCarParkDetail: (carPark) => {
    document.body.style.overflow = 'hidden';
    set((state) => ({ ...state, selectedCarPark: carPark }));
  },
  hideCarParkDetail: () => {
    document.body.style.overflow = '';
    set((state) => ({ ...state, selectedCarPark: undefined }));
  },
}));
