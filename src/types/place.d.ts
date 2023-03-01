export interface PlaceSearchRes {
  lastBuildDate: string; // 'Wed, 01 Mar 2023 10:27:27 +0900',
  total: number;
  start: number;
  display: number;
  items: Place[];
}

export interface Place {
  title: string; // '<b>강동</b>구청';
  link: string;
  category: string; // '공공,사회기관>구청';
  description: string;
  telephone: string;
  /**
   * '서울특별시 강동구 성내동 540'
   */
  address: string;
  /**
   * 서울특별시 강동구 성내로 25 강동구청';
   */
  roadAddress: string;
  mapx: string; // 322753
  mapy: string; // 547913
}
