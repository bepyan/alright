import { ParkingLotDetailInfo } from '~/models/alright';

export type PPlace = ParkingLotDetailInfo & {
  place_name: string;
  address_name: string;
};

export interface PublicPlace {
  PARKING_CODE: string; //	주차장코드
  PARKING_NAME: string; //	주차장명
  ADDR: string; //	주소
  PARKING_TYPE: string; //	주차장 종류
  PARKING_TYPE_NM: string; //	주차장 종류명
  OPERATION_RULE: string; //	운영구분
  OPERATION_RULE_NM: string; //	운영구분명
  TEL: string; //	전화번호
  QUE_STATUS: string; // 주차현황 정보 제공여부
  QUE_STATUS_NM: string; // 주차현황 정보 제공여부명
  CAPACITY: number; // 총 주차면
  CUR_PARKING: string; // 현재 주차 차량수
  CUR_PARKING_TIME: string; // 현재 주차 차량수 업데이트시간
  PAY_YN: string; // 유무료구분
  PAY_NM: string; // 유무료구분명
  NIGHT_FREE_OPEN: string; // 야간무료개방여부
  NIGHT_FREE_OPEN_NM: string; // 야간무료개방여부명
  WEEKDAY_BEGIN_TIME: string; // 평일 운영 시작시각(HHMM)
  WEEKDAY_END_TIME: string; // 평일 운영 종료시각(HHMM)
  WEEKEND_BEGIN_TIME: string; // 주말 운영 시작시각(HHMM)
  WEEKEND_END_TIME: string; // 주말 운영 종료시각(HHMM)
  HOLIDAY_BEGIN_TIME: string; // 공휴일 운영 시작시각(HHMM)
  HOLIDAY_END_TIME: string; // 공휴일 운영 종료시각(HHMM)
  SYNC_TIME: string; // 최종데이터 동기화 시간
  SATURDAY_PAY_YN: string; // 토요일 유,무료 구분
  SATURDAY_PAY_NM: string; // 토요일 유,무료 구분명
  HOLIDAY_PAY_YN: string; // 공휴일 유,무료 구분
  HOLIDAY_PAY_NM: string; // 공휴일 유,무료 구분명
  FULLTIME_MONTHLY: string; // 월 정기권 금액
  GRP_PARKNM: string; // 노상 주차장 관리그룹번호
  RATES: number; // 기본 주차 요금
  TIME_RATE: number; // 기본 주차 시간(분 단위)
  ADD_RATES: number; // 추가 단위 요금
  ADD_TIME_RATE: number; // 추가 단위 시간(분 단위)
  BUS_RATES: number; // 버스 기본 주차 요금
  BUS_TIME_RATE: number; // 버스 기본 주차 시간(분 단위)
  BUS_ADD_RATES: number; // 버스 추가 단위 요금
  BUS_ADD_TIME_RATE: number; // 버스 추가 단위 시간(분 단위)
  DAY_MAXIMUM: number; // 일 최대 요금
}

export interface PublicPlaceSearchRes {
  GetParkInfo: {
    list_total_count: string; //	총 데이터 건수 (정상조회 시 출력됨)
    RESULT: {
      CODE: string; // 요청결과 코드 (하단 메세지설명 참고)
      MESSAGE: string; // 요청결과 메시지 (하단 메세지설명 참고)
    };
    row: PublicPlace[];
  };
}

export interface SeoulParkingPlace {
  add_rates: number;
  tel: string;
  parking_type: string;
  bus_add_rates: number;
  addr: string;
  holiday_pay_yn: string;
  bus_rates: number;
  weekday_begin_time: string;
  time_rate: number;
  capacity: number;
  night_free_open_nm: string;
  add_time_rate: number;
  sync_time: Date;
  pay_yn: string;
  parking_code: number;
  rates: number;
  weekend_begin_time: string;
  weekday_end_time: string;
  parking_type_nm: string;
  saturday_pay_yn: string;
  operation_rule: string;
  bus_add_time_rate: number;
  pay_nm: string;
  parking_name: string;
  weekend_end_time: string;
  day_maximum: number;
  saturday_pay_nm: string;
  holiday_pay_nm: string;
  holiday_end_time: string;
  fulltime_monthly: string;
  grp_parknm: string;
  night_free_open: string;
  operation_rule_nm: string;
  bus_time_rate: number;
  holiday_begin_time: string;
}
