import type { NextApiRequest, NextApiResponse } from 'next';

import { getRealtimeParkingLot } from '~/services/realtime-parking-lot';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    switch (req.method) {
      case 'GET':
        if (!req.query.codeList) {
          res.status(400).json({ message: 'codeList is required' });
          return;
        }

        const codeList = (req.query.codeList as string).split(',');

        const data = await getRealtimeParkingLot(codeList);
        res.status(200).json(data);
        break;
      default:
        res.status(405).end();
    }
  } catch (e: any) {
    console.error(e);
    res.status(500).json(e);
  }
}
