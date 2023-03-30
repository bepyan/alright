import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { create } from 'zustand';

import { CarParkDetail, CarParkDetailInfo } from '~/types';

export const useCarParkDetail = create<{
  targetPlace?: CarParkDetail;
  computed: {
    show: boolean;
    weekdaysTime?: [Dayjs, Dayjs];
    satTime?: [Dayjs, Dayjs];
    sunTime?: [Dayjs, Dayjs];
  };
  showCarParkDetail: (targetPlace: CarParkDetail) => void;
  hideCarParkDetail: () => void;
  editCarPark: (carPark: CarParkDetailInfo) => void;
}>((set, get) => ({
  computed: {
    get show() {
      return Boolean(get().targetPlace);
    },
    get weekdaysTime() {
      const st = get().targetPlace?.weekdaysStartTime;
      const et = get().targetPlace?.weekdaysEndTime;
      return st && et ? ([dayjs(st, 'HH:mm'), dayjs(et, 'HH:mm')] as [Dayjs, Dayjs]) : undefined;
    },
    get satTime() {
      const st = get().targetPlace?.satStartTime;
      const et = get().targetPlace?.satEndTime;
      return st && et ? ([dayjs(st, 'HH:mm'), dayjs(et, 'HH:mm')] as [Dayjs, Dayjs]) : undefined;
    },
    get sunTime() {
      const st = get().targetPlace?.sunStartTime;
      const et = get().targetPlace?.sunEndTime;
      return st && et ? ([dayjs(st, 'HH:mm'), dayjs(et, 'HH:mm')] as [Dayjs, Dayjs]) : undefined;
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
