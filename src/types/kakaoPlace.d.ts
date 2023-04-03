// developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword-response

export interface RegionInfo {
  /**
   * 질의어에서 인식된 지역의 리스트
   * ex. '중앙로 맛집' 에서 중앙로에 해당하는 지역 리스트
   */
  region: string[];
  /**
   * 질의어에서 지역 정보를 제외한 키워드
   * ex. '중앙로 맛집' 에서 '맛집'
   */
  keyword: string;
  /**
   * 인식된 지역 리스트 중, 현재 검색에 사용된 지역 정보
   */
  selected_region: string;
}

export interface KPlaceSearchRes {
  meta: {
    same_name: RegionInfo;
    /**
     * total_count 중 노출 가능 문서 수 (최대: 45)
     */
    pageable_count: number;
    total_count: number;
    is_end: boolean;
  };
  documents: KPlace[];
}

export interface KPlace {
  id?: string;
  place_name: string;
  /**
   * 중심좌표까지의 거리 (단, x,y 파라미터를 준 경우에만 존재) 단위 meter
   * ex. '418'
   */
  distance: string;
  /**
   * 'http://place.map.kakao.com/26338954'
   */
  place_url: string;
  /**
   * 전체 지번 주소
   * ex. '서울 강남구 삼성동 159'
   */
  address_name: string;
  /**
   * 전체 도로명 주소
   * ex. '서울 강남구 영동대로 513'
   */
  road_address_name: string;
  /**
   * '02-6002-1880'
   */
  phone: string;
  /**
   * '가정,생활 > 문구,사무용품 > 디자인문구 > 카카오프렌즈'
   */
  category_name: string;
  /**
   * 중요 카테고리만 그룹핑한 카테고리 그룹 코드
   */
  category_group_code: string;
  /**
   * 중요 카테고리만 그룹핑한 카테고리 그룹명
   */
  category_group_name: string;
  /**
   * X 좌표값, 경위도인 경우 longitude (경도)
   * ex.'127.05902969025047'
   */
  x: string;
  /**
   * Y 좌표값, 경위도인 경우 latitude(위도)
   * ex. '37.51207412593136'
   */
  y: string;
}
