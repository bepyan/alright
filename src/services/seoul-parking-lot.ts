import { SeoulParkingPlace } from '~/types';

// http://data.seoul.go.kr/dataList/OA-13122/S/1/datasetView.do
import { DATA } from '../assets/seoul-parking-lot.json';

const db = DATA as unknown as SeoulParkingPlace[];

export const getSeoulPublicParkingLotList = (search: string) => {
  return db
    .filter(
      (parkingLot) => parkingLot.addr.includes(search) || parkingLot.parking_name.includes(search),
    )
    .sort((a, b) => (a.parking_name > b.parking_name ? 1 : -1));
};
