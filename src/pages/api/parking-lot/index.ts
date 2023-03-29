import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>) {

  switch (req.method) {
    case 'GET':
      res.status(200).json({
        method: 'GET'
      })
      break;
    case 'POST':
      res.status(200).json({
        method: 'POST'
      })
      break;
  }
}

type Response = {
  method: string
}