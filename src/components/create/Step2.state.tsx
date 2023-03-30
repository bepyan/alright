import { create } from 'zustand';

import { ParkingLotDetailInfo, ParkingLotInfo } from '~/models/alright';

export const useCarParkDetail = create<{
  targetPlace?: ParkingLotInfo;
  computed: { show: boolean };
  showCarParkDetail: (targetPlace: ParkingLotInfo) => void;
  hideCarParkDetail: () => void;
  editCarPark: (carPark: ParkingLotDetailInfo) => void;
}>((set, get) => ({
  computed: {
    get show() {
      return Boolean(get().targetPlace);
    },
  },
  showCarParkDetail: (targetPlace) => {
    document.body.style.overflow = 'hidden';
    set((state) => ({
      ...state,
      targetPlace: {
        freeTimeDiscount: '60',
        defaultFeeTime: '',
        additionFeeTime: '',
        ...targetPlace,
      },
    }));
  },
  hideCarParkDetail: () => {
    document.body.style.overflow = '';
    set((state) => ({ ...state, targetPlace: undefined }));
  },
  editCarPark: (carPark) =>
    set((v) => ({
      ...v,
      targetPlace: v.targetPlace ? { ...v.targetPlace, ...carPark } : undefined,
    })),
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
