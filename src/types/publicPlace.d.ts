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
  /**
   * ADDR: '주소'
   */
  addr: string;
  /**
   * ADD_RATES: '추가 단위 요금'
   */
  add_rates: number;
  /**
   * ADD_TIME_RATE: '추가 단위 시간(분 단위)'
   */
  add_time_rate: number;
  bus_add_rates: number;
  bus_add_time_rate: number;
  bus_rates: number;
  bus_time_rate: number;
  /**
   * CAPACITY: '총 주자면'
   */
  capacity: number;
  /**
   * DAY_MAXIMUM: '일 최대 요금'
   */
  day_maximum: number;
  /**
   * FULLTIME_MONTHLY: '월 정기권 금액'
   */
  fulltime_monthly: string;
  /**
   * GRP_PARKNM: '노상 주차장 관리그룹번호'
   */
  grp_parknm: string;
  /**
   * HOLIDAY_BEGIN_TIME: '공휴일 운영 시작시각(HHMM)'
   */
  holiday_begin_time: string;
  /**
   * HOLIDAY_END_TIME: '공휴일 운영 종료시각(HHMM)'
   */
  holiday_end_time: string;
  /**
   * HOLIDAY_PAY_NM: '공휴일 유,무료 구분명'
   */
  holiday_pay_nm: string;
  /**
   * HOLIDAY_PAY_YN: '공휴일 유,무료 구분'
   */
  holiday_pay_yn: string;
  /**
   * NIGHT_FREE_OPEN_NM: '야간무료개방여부명'
   */
  night_free_open_nm: string;
  /**
   * NIGHT_FREE_OPEN: '야간무료개방여부'
   */
  night_free_open: string;
  /**
   * OPERATION_RULE_NM: '운영구분명'
   */
  operation_rule_nm: string;
  /**
   * OPERATION_RULE: '운영구분'
   */
  operation_rule: string;
  /**
   * PARKING_CODE: '주차장코드' ✨
   */
  parking_code: number;
  /**
   * PARKING_NAME: '주차장명'
   */
  parking_name: string;
  /**
   * PARKING_TYPE_NM: '주차장 종류명'
   */
  parking_type_nm: string;
  /**
   * PARKING_TYPE: '주차장 종류'
   */
  parking_type: string;
  /**
   * PAY_NM: '유무료구분명'
   */
  pay_nm: string;
  /**
   * PAY_YN: '유무료구분'
   */
  pay_yn: string;
  /**
   * RATES: '기본 주차 요금'
   */
  rates: number;
  /**
   * SATURDAY_PAY_NM: '토요일 유,무료 구분명'
   */
  saturday_pay_nm: string;
  /**
   * SATURDAY_PAY_YN: '토요일 유,무료 구분'
   */
  saturday_pay_yn: string;
  /**
   * SYNC_TIME: '최종데이터 동기화 시간'
   */
  sync_time: Date;
  /**
   * TEL: '전화번호'
   */
  tel: string;
  /**
   * TIME_RATE: '기본 주차 시간(분 단위)'
   */
  time_rate: number;
  /**
   * WEEKDAY_BEGIN_TIME: '평일 운영 시작시각(HHMM)'
   */
  weekday_begin_time: string;
  /**
   * WEEKDAY_END_TIME: '평일 운영 종료시각(HHMM)'
   */
  weekday_end_time: string;
  /**
   * WEEKEND_BEGIN_TIME: '주말 운영 시작시각(HHMM)'
   */
  weekend_begin_time: string;
  /**
   * WEEKEND_END_TIME: '주말 운영 종료시각(HHMM)'
   */
  weekend_end_time: string;
}
