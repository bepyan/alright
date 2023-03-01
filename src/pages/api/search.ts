import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // https://developers.naver.com/docs/serviceapi/search/local/local.md
    try {
      const { data } = await axios({
        url: 'https://openapi.naver.com/v1/search/local.json',
        timeout: 3000,
        headers: {
          'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
        },
        params: { display: 10, ...req.query },
      });

      res.status(200).json(data);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  }
}
