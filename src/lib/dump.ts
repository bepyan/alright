import { CarParkDetail, Place } from '~/types';

export const _dummyPlace: Place = {
  address_name: '서울 용산구 한강로2가 98-3',
  category_group_code: 'FD6',
  category_group_name: '음식점',
  category_name: '음식점 > 술집 > 와인바',
  distance: '',
  id: '19950533191234',
  phone: '',
  place_name: '오라이샴팡',
  place_url: 'http://place.map.kakao.com/1995053319',
  road_address_name: '서울 용산구 한강대로46길 15',
  x: '126.971150136434',
  y: '37.5312061331283',
};

export const _dummyCarPark: CarParkDetail = {
  ..._dummyPlace,
};
