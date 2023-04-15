import type { Dayjs } from 'dayjs';
import { create } from 'zustand';

import { formatDayRangeValue } from '~/lib/format';
import { ParkingLotDetailInfo, ParkingLotInfo } from '~/models/alright';

export const useCarParkDetail = create<{
  targetPlace?: ParkingLotInfo;
  isPassLinked?: boolean;
  computed: {
    show: boolean;
    weekdaysTime?: [Dayjs, Dayjs];
    satTime?: [Dayjs, Dayjs];
    sunTime?: [Dayjs, Dayjs];
  };
  showCarParkDetail: (targetPlace: ParkingLotInfo) => void;
  hideCarParkDetail: () => void;
  editTargetPlace: (carPark: ParkingLotDetailInfo) => void;
  editPassLinked: (isPassLinked: boolean) => void;
  relinkSeoulParkingPlace: () => void;
}>((set, get) => ({
  computed: {
    get show() {
      return Boolean(get().targetPlace);
    },
    get weekdaysTime() {
      const { targetPlace } = get();
      const st = targetPlace?.weekdaysStartTime;
      const et = targetPlace?.weekdaysEndTime;
      return st && et ? formatDayRangeValue(st, et) : undefined;
    },
    get satTime() {
      const { targetPlace } = get();
      const st = targetPlace?.satStartTime;
      const et = targetPlace?.satEndTime;
      return st && et ? formatDayRangeValue(st, et) : undefined;
    },
    get sunTime() {
      const { targetPlace } = get();
      const st = targetPlace?.sunStartTime;
      const et = targetPlace?.sunEndTime;
      return st && et ? formatDayRangeValue(st, et) : undefined;
    },
  },
  showCarParkDetail: (targetPlace) => {
    document.body.style.overflow = 'hidden';
    set((state) => ({
      ...state,
      targetPlace: {
        freeTimeDiscount: '60',
        ...targetPlace,
      },
    }));
  },
  hideCarParkDetail: () => {
    document.body.style.overflow = '';
    set((state) => ({
      ...state,
      targetPlace: undefined,
      isPassLinked: undefined,
    }));
  },
  editTargetPlace: (carPark) =>
    set((v) => ({
      ...v,
      targetPlace: v.targetPlace ? { ...v.targetPlace, ...carPark } : undefined,
    })),
  editPassLinked: (isPassLinked) => set((v) => ({ ...v, isPassLinked })),
  relinkSeoulParkingPlace: () =>
    set((v) => ({
      ...v,
      isPassLinked: undefined,
      targetPlace: v.targetPlace && {
        ...v.targetPlace,
        parkingCode: undefined,
      },
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
