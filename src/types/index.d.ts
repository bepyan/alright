import { Place } from './kakaoPlace';

export * from './kakaoPlace';

export interface CarParkDetailInfo {
  freeTimeDiscount?: string;
  defaultFeeTime?: string;
  defaultFeeAmount?: string;
  additionFeeTime?: string;
  additionFeeAmount?: string;
  weekdaysStartTime?: string;
  weekdaysEndTime?: string;
  satStartTime?: string;
  satEndTime?: string;
  sunStartTime?: string;
  sunEndTime?: string;
  otherInfo?: string;
}

export type CarParkDetail = Place & CarParkDetailInfo;
