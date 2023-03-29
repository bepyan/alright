import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>) {

  switch (req.method) {
    case 'GET':
      const address = (req.query.address as string).replaceAll(' ', '_');
      const responseData: any[] = []
      axios.get('http://openapi.seoul.go.kr:8088/617055457a676a77393473447a5953/json/GetParkInfo/1/5/' + address)
        .then((response) => {
          if (response.data.GetParkInfo != undefined) {
            (response.data.GetParkInfo.row as any[]).forEach(row => {
              responseData.push({
                place_name: row.PARKING_NAME,
                address_name: row.ADDR ,
                defaultFeeTime: (row.TIME_RATE as number).toString(),
                defaultFeeAmount: (row.RATES as number).toString(),
                additionFeeTime: (row.ADD_TIME_RATE as number).toString(),
                additionFeeAmount: (row.ADD_RATES as number).toString(),
                weekdaysStartTime: insertColonInDate(row.WEEKDAY_BEGIN_TIME),
                weekdaysEndTime: insertColonInDate(row.WEEKDAY_END_TIME),
                satStartTime: insertColonInDate(row.HOLIDAY_BEGIN_TIME),
                satEndTime: insertColonInDate(row.HOLIDAY_END_TIME),
                sunStartTime: insertColonInDate(row.HOLIDAY_BEGIN_TIME),
                sunEndTime: insertColonInDate(row.HOLIDAY_END_TIME)
              })
            });
          }
          res.status(200).json({
            data: responseData
          })
        }).catch((Error) => {
          console.log(Error);
        })
      break;
  }
}

function insertColonInDate(date: any){
  return (date as string).slice(0,2) + ":" + (date as string).slice(2,4)
}