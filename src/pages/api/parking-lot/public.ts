import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PPlace, PublicPlaceSearchRes } from '~/types';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  switch (req.method) {
    case 'GET':
      const address = (req.query.address as string).replaceAll(' ', '_');

      axios<PublicPlaceSearchRes>({
        url: `http://openapi.seoul.go.kr:8088/617055457a676a77393473447a5953/json/GetParkInfo/1/5/${address}`,
      })
        .then((response) => {
          const data: PPlace[] = response.data.GetParkInfo.row.map((row) => {
            return {
              place_name: row.PARKING_NAME,
              address_name: row.ADDR,
              // ParkingLotDetailInfo
              defaultFeeTime: row.TIME_RATE.toString(),
              defaultFeeAmount: row.RATES.toString(),
              additionFeeTime: row.ADD_TIME_RATE.toString(),
              additionFeeAmount: row.ADD_RATES.toString(),
              weekdaysStartTime: insertColonInDate(row.WEEKDAY_BEGIN_TIME),
              weekdaysEndTime: insertColonInDate(row.WEEKDAY_END_TIME),
              satStartTime: insertColonInDate(row.HOLIDAY_BEGIN_TIME),
              satEndTime: insertColonInDate(row.HOLIDAY_END_TIME),
              sunStartTime: insertColonInDate(row.HOLIDAY_BEGIN_TIME),
              sunEndTime: insertColonInDate(row.HOLIDAY_END_TIME),
            };
          });

          res.status(200).json({ data });
        })
        .catch((e) => {
          console.log(e);
          res.status(400);
        });
      break;
  }
}

function insertColonInDate(date: string) {
  return date.slice(0, 2) + ':' + date.slice(2, 4);
}
