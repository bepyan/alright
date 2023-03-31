import { create } from 'zustand';

import { _dummyData } from '~/lib/dump';
import { ParkingLotInfo } from '~/models/alright';
import { KPlace } from '~/types';

interface CreateProps {
  company: KPlace;
  carParkList: ParkingLotInfo[];
  selectedCarPark?: ParkingLotInfo;
  isShowCarParkDetail: boolean;
  showCarParkDetail: (carPark: KPlace) => void;
  hideCarParkDetail: () => void;
}

export const useCarParkDetail = create<CreateProps>((set) => ({
  company: _dummyData.company,
  carParkList: _dummyData.selectedCarParkList,
  isShowCarParkDetail: false,
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
}));
