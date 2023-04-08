import { model, models, Schema } from 'mongoose';

import { KPlace } from '~/types';

export interface ParkingLotDetailInfo {
  _id?: string;
  parkingCode?: number;
  freeTimeDiscount?: string;
  /**
   * 단위 분
   */
  defaultFeeTime?: string;
  /**
   * 단위 원
   */
  defaultFeeAmount?: string;
  additionFeeTime?: string;
  additionFeeAmount?: string;
  /**
   * 단위 시:분
   */
  weekdaysStartTime?: string;
  weekdaysEndTime?: string;
  satStartTime?: string;
  satEndTime?: string;
  sunStartTime?: string;
  sunEndTime?: string;
  otherInfo?: string;
}

export type ParkingLotInfo = KPlace & ParkingLotDetailInfo;

const parkingLotInfoScheme = new Schema<ParkingLotInfo>({
  /**
   * kakao 맵 장소 ID
   */
  id: {
    type: String,
  },
  freeTimeDiscount: {
    type: String,
  },
  defaultFeeTime: {
    type: String,
  },
  defaultFeeAmount: {
    type: String,
  },
  additionFeeTime: {
    type: String,
  },
  additionFeeAmount: {
    type: String,
  },
  weekdaysStartTime: {
    type: String,
  },
  weekdaysEndTime: {
    type: String,
  },
  satStartTime: {
    type: String,
  },
  satEndTime: {
    type: String,
  },
  sunStartTime: {
    type: String,
  },
  sunEndTime: {
    type: String,
  },
  otherInfo: {
    type: String,
  },
  place_name: {
    type: String,
  },
  /**
   * 중심좌표까지의 거리 (단, x,y 파라미터를 준 경우에만 존재) 단위 meter
   * ex. '418'
   */
  distance: {
    type: String,
  },
  /**
   * 'http://place.map.kakao.com/26338954'
   */
  place_url: {
    type: String,
  },
  /**
   * 전체 지번 주소
   * ex. '서울 강남구 삼성동 159'
   */
  address_name: {
    type: String,
  },
  /**
   * 전체 도로명 주소
   * ex. '서울 강남구 영동대로 513'
   */
  road_address_name: {
    type: String,
  },
  /**
   * '02-6002-1880'
   */
  phone: {
    type: String,
  },
  /**
   * '가정,생활 > 문구,사무용품 > 디자인문구 > 카카오프렌즈'
   */
  category_name: {
    type: String,
  },
  /**
   * 중요 카테고리만 그룹핑한 카테고리 그룹 코드
   */
  category_group_code: {
    type: String,
  },
  /**
   * 중요 카테고리만 그룹핑한 카테고리 그룹명
   */
  category_group_name: {
    type: String,
  },
  /**
   * X 좌표값, 경위도인 경우 longitude (경도)
   * ex.'127.05902969025047'
   */
  x: {
    type: String,
  },
  /**
   * Y 좌표값, 경위도인 경우 latitude(위도)
   * ex. '37.51207412593136'
   */
  y: {
    type: String,
  },
});

export interface Alright {
  createdDate: Date;
  hashCode: string;
  company: ParkingLotInfo;
  parkingLots: Array<ParkingLotInfo>;
}

const alrightScheme = new Schema<Alright>({
  createdDate: {
    type: Date,
    required: true,
  },
  hashCode: {
    type: String,
    required: true,
  },
  company: parkingLotInfoScheme,
  parkingLots: [parkingLotInfoScheme],
});

export const Alright = models.Alright || model<Alright>('Alright', alrightScheme);
