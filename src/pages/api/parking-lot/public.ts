import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PPlace, PublicPlaceSearchRes } from '~/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  switch (req.method) {
    case 'GET':
      if (!req.query.address) {
        res.status(400).json({ message: 'address is required' });
        return;
      }

      const address = req.query.address as string;

      try {
        const response = await axios({
          url: `http://openapi.seoul.go.kr:8088/617055457a676a77393473447a5953/json/GetParkInfo/1/5/${address}`,
        });

        if (response.data?.RESULT?.CODE) {
          res.status(400).json({ message: response.data?.RESULT.MESSAGE });
          return;
        }

        const data = response.data as PublicPlaceSearchRes;

        const transferredData: PPlace[] = data.GetParkInfo.row.map((row) => {
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

        res.status(200).json(transferredData);
      } catch (e: any) {
        console.error(e);
        res.status(500).json({ message: e.toString() });
      }
      break;
    default:
      res.status(405).end();
  }
}

function insertColonInDate(date: string) {
  return date.slice(0, 2) + ':' + date.slice(2, 4);
}
