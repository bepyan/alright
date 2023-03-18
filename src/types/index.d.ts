import { Place } from './kakaoPlace';

export * from './kakaoPlace';

export interface CarParkDetailInfo {
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

export type CarParkDetail = Place & CarParkDetailInfo;
