import type { NextApiRequest, NextApiResponse } from 'next';

import { getSeoulPublicParkingLotList } from '~/services/seoul-parking-lot';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  switch (req.method) {
    case 'GET':
      if (!req.query.search) {
        res.status(400).json({ message: 'search is required' });
        return;
      }

      const search = req.query.search as string;
      const data = getSeoulPublicParkingLotList(search);

      res.status(200).json(data);

      break;
    default:
      res.status(405).end();
  }
}
