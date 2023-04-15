import axios from 'axios';

import { PlaceRealtimeInfo, PublicPlaceRealtimeSearchRes } from '~/types';

// http://data.seoul.go.kr/dataList/OA-21709/S/1/datasetView.do
export async function getRealtimeParkingLot(codeList: string[]): Promise<PlaceRealtimeInfo[]> {
  const API_KEY = '617055457a676a77393473447a5953';
  const COUNT_PER_PAGE = 1000;

  try {
    const data = await Promise.all(
      [...new Array(2)]
        .map((_, i) => ({ startIndex: i * COUNT_PER_PAGE + 1, endIndex: (i + 1) * COUNT_PER_PAGE }))
        .map(async ({ startIndex, endIndex }) => {
          const { data } = await axios<PublicPlaceRealtimeSearchRes>(
            `http://openapi.seoul.go.kr:8088/${API_KEY}/json/GetParkingInfo/${startIndex}/${endIndex}`,
          );
          return data.GetParkingInfo.row;
        }),
    );

    const resultList = data.flat().filter((item) => codeList.includes(item.PARKING_CODE));

    return codeList.map((code) => {
      const result = resultList.find((item) => item.PARKING_CODE === code);

      return {
        isEnabled: !!result?.QUE_STATUS,
        parkingCode: result?.PARKING_CODE ?? code,
        totalCount: result?.CAPACITY ?? 0,
        currentCount: result?.CUR_PARKING ?? 0,
        updatedTime: result?.CUR_PARKING_TIME ?? '',
        description: result?.QUE_STATUS_NM ?? '',
      };
    });
  } catch (e: any) {
    console.error(e);
    return [];
  }
}
