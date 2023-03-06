export * from './kakaoPlace';

export interface CarParkDetail {
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
