import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-category
    try {
      const { data } = await axios({
        url: 'https://dapi.kakao.com/v2/local/search/category.json',
        timeout: 3000,
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
        params: { category_group_code: 'PK6', ...req.query },
      });

      res.status(200).json(data);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  }
}
