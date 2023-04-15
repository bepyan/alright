import { create } from 'zustand';

import { _dummyData } from '~/lib/dump';
import { Alright, ParkingLotInfo } from '~/models/alright';
import { KPlace } from '~/types';

interface CreateProps {
  company: KPlace;
  carParkList: ParkingLotInfo[];
  selectedCarPark?: ParkingLotInfo;
  focusedCarPark?: ParkingLotInfo;
  isShowCarParkDetail: boolean;
  computed: {
    isSelectedPublishCarPark: boolean;
    weekdayTimeRange?: string;
    weekendTimeRange?: string;
    holidayTimeRange?: string;
  };
  showCarParkDetail: (carPark: ParkingLotInfo) => void;
  hideCarParkDetail: () => void;
  setFocusedCarPark: (carPark?: ParkingLotInfo) => void;
  loadCarParkDetail: (alright: Alright) => void;
}

export const useCarParkDetail = create<CreateProps>((set, get) => ({
  company: _dummyData.company,
  carParkList: _dummyData.selectedCarParkList,
  isShowCarParkDetail: false,
  computed: {
    get isSelectedPublishCarPark() {
      return !!get().selectedCarPark?.parkingCode;
    },
    get weekdayTimeRange() {
      const { selectedCarPark } = get();
      if (!selectedCarPark) return undefined;

      const { weekdaysStartTime, weekdaysEndTime } = selectedCarPark;
      if (!weekdaysStartTime || !weekdaysEndTime) return undefined;

      return `${weekdaysStartTime} ~ ${weekdaysEndTime}`;
    },
    get weekendTimeRange() {
      const { selectedCarPark } = get();
      if (!selectedCarPark) return undefined;

      const { weekendStartTime, weekendEndTime } = selectedCarPark;
      if (!weekendStartTime || !weekendEndTime) return undefined;

      return `${weekendStartTime} ~ ${weekendEndTime}`;
    },
    get holidayTimeRange() {
      const { selectedCarPark } = get();
      if (!selectedCarPark) return undefined;

      const { holidayStartTime, holidayEndTime } = selectedCarPark;
      if (!holidayStartTime || !holidayEndTime) return undefined;

      return `${holidayStartTime} ~ ${holidayEndTime}`;
    },
  },
  showCarParkDetail: (carPark) => {
    // TODO: 클릭시 최상단 스크롤 되도록
    set((state) => ({ ...state, isShowCarParkDetail: true, selectedCarPark: carPark }));
  },
  hideCarParkDetail: () => {
    set((state) => ({ ...state, isShowCarParkDetail: false }));
    setTimeout(() => {
      set((state) => ({ ...state, selectedCarPark: undefined }));
    }, 300);
  },
  setFocusedCarPark: (carPark) => {
    set((state) => ({ ...state, focusedCarPark: carPark }));
  },
  loadCarParkDetail: (alright) => {
    set({
      company: alright.company,
      carParkList: alright.parkingLots,
      isShowCarParkDetail: false,
    });
  },
}));
