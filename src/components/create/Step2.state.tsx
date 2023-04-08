import type { Dayjs } from 'dayjs';
import { create } from 'zustand';

import { formatDayRangeValue } from '~/lib/format';
import { ParkingLotDetailInfo, ParkingLotInfo } from '~/models/alright';
import { SeoulParkingPlace } from '~/types';

export const useCarParkDetail = create<{
  targetPlace?: ParkingLotInfo;
  seoulParkingPlace?: SeoulParkingPlace;
  isPassLinked?: boolean;
  computed: {
    show: boolean;
    weekdaysTime?: [Dayjs, Dayjs];
    satTime?: [Dayjs, Dayjs];
    sunTime?: [Dayjs, Dayjs];
  };
  showCarParkDetail: (targetPlace: ParkingLotInfo) => void;
  hideCarParkDetail: () => void;
  editCarPark: (carPark: ParkingLotDetailInfo) => void;
  editPassLinked: (isPassLinked: boolean) => void;
  editSeoulParkingPlace: (seoulParkingPlace?: SeoulParkingPlace) => void;
  relinkSeoulParkingPlace: () => void;
}>((set, get) => ({
  computed: {
    get show() {
      return Boolean(get().targetPlace);
    },
    get weekdaysTime() {
      const { targetPlace, seoulParkingPlace } = get();
      const st = targetPlace?.weekdaysStartTime ?? seoulParkingPlace?.weekday_begin_time;
      const et = targetPlace?.weekdaysEndTime ?? seoulParkingPlace?.weekday_end_time;
      return st && et ? formatDayRangeValue(st, et) : undefined;
    },
    get satTime() {
      const { targetPlace, seoulParkingPlace } = get();
      const st = targetPlace?.satStartTime ?? seoulParkingPlace?.weekend_begin_time;
      const et = targetPlace?.satEndTime ?? seoulParkingPlace?.weekend_end_time;
      return st && et ? formatDayRangeValue(st, et) : undefined;
    },
    get sunTime() {
      const { targetPlace, seoulParkingPlace } = get();
      const st = targetPlace?.sunStartTime ?? seoulParkingPlace?.weekend_begin_time;
      const et = targetPlace?.sunEndTime ?? seoulParkingPlace?.weekend_end_time;
      return st && et ? formatDayRangeValue(st, et) : undefined;
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
    set((state) => ({
      ...state,
      targetPlace: undefined,
      seoulParkingPlace: undefined,
      isPassLinked: undefined,
    }));
  },
  editCarPark: (carPark) =>
    set((v) => ({
      ...v,
      targetPlace: v.targetPlace ? { ...v.targetPlace, ...carPark } : undefined,
    })),
  editPassLinked: (isPassLinked) => set((v) => ({ ...v, isPassLinked })),
  editSeoulParkingPlace: (seoulParkingPlace) => set((v) => ({ ...v, seoulParkingPlace })),
  relinkSeoulParkingPlace: () =>
    set((v) => ({
      ...v,
      isPassLinked: undefined,
      seoulParkingPlace: undefined,
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
