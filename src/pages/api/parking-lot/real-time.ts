import type { NextApiRequest, NextApiResponse } from 'next';

interface Response {
  method: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  switch (req.method) {
    case 'GET':
      res.status(200).json({
        method: 'GET',
      });
      break;
  }
}
