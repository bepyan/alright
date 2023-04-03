import type { NextApiRequest, NextApiResponse } from 'next';

import { createParkingLot, getParkingLot } from '~/services/parking-lot';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  switch (req.method) {
    case 'GET':
      const hashCode = req.query.hashCode as string;

      getParkingLot(hashCode).then((foundAlright) => {
        res.status(200).json({
          message: 'Search Complete!',
          data: foundAlright,
        });
      });

      break;
    case 'POST':
      createParkingLot(req.body).then((hashCode) => {
        res.status(200).json({
          message: 'Save Complete!',
          hashCode: hashCode,
        });
      });
      break;
  }
}
