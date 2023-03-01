import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { create } from 'zustand';
import { transferPosition } from '~/lib/utils';
import { Place } from '~/types/place';

import BackButton from '~/ui/BackButton';
import Button from '~/ui/Button';
import { Icons } from '~/ui/Icons';
import IconTitle from '~/ui/IconTitle';
import { InputFrame } from '~/ui/Input';
import StepNav from '~/ui/StepNav';

import { useCreate } from './state';

const useCarParkDetail = create<{
  targetPlace?: Place;
  computed: { show: boolean };
  showCarParkDetail: (targetPlace: Place) => void;
  hideCarParkDetail: () => void;
}>((set, get) => ({
  computed: {
    get show() {
      return Boolean(get().targetPlace);
    },
  },
  showCarParkDetail: (targetPlace) => {
    document.body.style.overflow = 'hidden';
    set((state) => ({ ...state, targetPlace }));
  },
  hideCarParkDetail: () => {
    document.body.style.overflow = '';
    set((state) => ({ ...state, targetPlace: undefined }));
  },
}));

const useCarParkSearch = create<{
  show: boolean;
  showCarParkSearch: () => void;
  hideCarParkSearch: () => void;
}>((set) => ({
  show: false,
  showCarParkSearch: () => {
    document.body.style.overflow = 'hidden';
    set((state) => ({ ...state, show: true }));
  },
  hideCarParkSearch: () => {
    document.body.style.overflow = '';
    set((state) => ({ ...state, show: false }));
  },
}));

export default function Step2() {
  const company = useCreate((s) => s.company)!;
  const companyPosition = transferPosition(company);
  const selectedCarParkList = useCreate((s) => s.selectedCarParkList);

  const showDetail = useCarParkDetail((s) => s.computed.show);
  const showSearch = useCarParkSearch((s) => s.show);
  const showCarParkSearch = useCarParkSearch((s) => s.showCarParkSearch);

  const [map, setMap] = useState<kakao.maps.Map>();
  const [nearCarParkList, setNearCarParkList] = useState<Place[]>([]);

  useEffect(() => {
    if (!map) return;

    const ps = new kakao.maps.services.Places();
    ps.categorySearch(
      'PK6',
      (data, status, _pagination) => {
        console.log(data);

        if (status !== kakao.maps.services.Status.OK) {
          return;
        }

        setNearCarParkList(data);
      },
      {
        useMapBounds: true,
        x: companyPosition.lng,
        y: companyPosition.lat,
        sort: kakao.maps.services.SortBy.DISTANCE,
      },
    );
  }, [map]);

  return (
    <>
      <div className='space-y-3 p-container pt-3'>
        <StepNav currentStep={2} />
        <h2 className='text-xl font-bold'>계약한 주차장을 모두 추가해주세요.</h2>
        <InputFrame placeholder='계약한 주차장 검색' onClick={showCarParkSearch} />
      </div>

      <Map center={companyPosition} className='h-52 w-full' onCreate={setMap}>
        <MapMarker
          position={companyPosition}
          image={{
            src: `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse opacity='0.3' cx='20' cy='38' rx='4' ry='2' fill='black'/%3E%3Cpath d='M34 16.9747C34 27.019 20 37.5 20 37.5C20 37.5 6 27.019 6 16.9747C6 9.25668 12.268 3 20 3C27.732 3 34 9.25668 34 16.9747Z' fill='%23F95E5E'/%3E%3Ccircle cx='20' cy='17' r='5' fill='white'/%3E%3C/svg%3E%0A`,
            size: {
              width: 40,
              height: 40,
            },
          }}
        />
        <CustomOverlayMap position={companyPosition}>
          <div className='mt-4 text-xs font-bold text-shadow-border w-20 text-center whitespace-normal'>
            {company.place_name}
          </div>
        </CustomOverlayMap>

        {nearCarParkList.map((marker) => (
          <MapMarker
            key={`icon-${marker.id}`}
            position={transferPosition(marker)}
            image={{
              src: "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='11.25' fill='%2363C7F1' stroke='white' stroke-width='1.5'/%3E%3Cpath d='M9 17.36H11.072V13.678H12.458C14.684 13.678 16.448 12.628 16.448 10.262C16.448 7.798 14.684 7 12.402 7H9V17.36ZM11.072 12.04V8.652H12.248C13.676 8.652 14.432 9.044 14.432 10.262C14.432 11.438 13.746 12.04 12.318 12.04H11.072Z' fill='white'/%3E%3C/svg%3E%0A",
              size: {
                width: 24,
                height: 24,
              },
            }}
          />
        ))}
        {nearCarParkList.map((marker) => (
          <CustomOverlayMap key={`text-${marker.id}`} position={transferPosition(marker)}>
            <div className='relative text-xs font-bold text-shadow-border w-20'>
              <div className='absolute top-1 w-full text-center whitespace-normal break-keep'>
                {marker.place_name}
              </div>
            </div>
          </CustomOverlayMap>
        ))}
      </Map>

      {Boolean(selectedCarParkList.length) && (
        <div className='p-container'>
          <IconTitle icon='Check' text='추가한 주차장' className='text-al-blue' />
          <div className='mt-container rounded-xl border border-al-blue space:border-t'>
            {selectedCarParkList.map((item) => (
              <CarParkItem key={`selected-place-${item.id}`} item={item} />
            ))}
          </div>
        </div>
      )}

      <div className='p-container'>
        <IconTitle icon='CarPark' text='근처 주차장' />
        <div className='mt-container rounded-xl border border-al-border space:border-t'>
          {nearCarParkList.map((item) => (
            <CarParkItem key={`place-${item.id}`} item={item} />
          ))}
        </div>
      </div>

      {showDetail && <CarParkDetail />}
      {showSearch && <CarParkSearch />}
    </>
  );
}

function CarParkItem({ item }: { item: Place }) {
  const showCarParkDetail = useCarParkDetail((s) => s.showCarParkDetail);
  const onClick = () => showCarParkDetail(item);

  return (
    <div
      className='flex items-center justify-between p-container pr-3 border-al-border'
      onClick={onClick}
    >
      <div>
        <p className='font-bold'>{item.place_name}</p>
        <p className='mt-1 text-sm text-al-slate'>{item.address_name}</p>
      </div>
      <Icons.ChevronRight className='h-5 w-5 text-al-disabled' />
    </div>
  );
}

function CarParkDetail() {
  const place = useCarParkDetail((s) => s.targetPlace)!;
  const placePosition = transferPosition(place);
  const hideCarParkDetail = useCarParkDetail((s) => s.hideCarParkDetail);

  const selectedCarParkList = useCreate((s) => s.selectedCarParkList);
  const isSelected = selectedCarParkList.some((v) => v.id === place.id);
  const selectCarPark = useCreate((s) => () => {
    s.selectCarPark(place);
    hideCarParkDetail();
  });
  const removeCarPark = useCreate((s) => () => {
    s.removeCarPark(place);
    hideCarParkDetail();
  });

  return (
    <div className='container fixed inset-0 z-50 overflow-y-scroll bg-white'>
      <div className='container fixed mt-1.5 ml-3.5 z-50'>
        <div className=''>
          <BackButton
            className='flex h-9 w-9 items-center justify-center rounded-full bg-white'
            onClick={hideCarParkDetail}
          />
        </div>
      </div>

      <Map center={placePosition} className='h-48 w-full'>
        <MapMarker
          position={placePosition}
          image={{
            src: "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse opacity='0.3' cx='20' cy='38' rx='4' ry='2' fill='black'/%3E%3Cpath d='M34 16.9747C34 27.019 20 37.5 20 37.5C20 37.5 6 27.019 6 16.9747C6 9.25668 12.268 3 20 3C27.732 3 34 9.25668 34 16.9747Z' fill='%232A72FF'/%3E%3Cpath d='M16.5 24H18.9V19.7351H20.5054C23.0838 19.7351 25.127 18.5189 25.127 15.7784C25.127 12.9243 23.0838 12 20.4405 12H16.5V24ZM18.9 17.8378V13.9135H20.2622C21.9162 13.9135 22.7919 14.3676 22.7919 15.7784C22.7919 17.1405 21.9973 17.8378 20.3432 17.8378H18.9Z' fill='white'/%3E%3C/svg%3E%0A",
            size: {
              width: 40,
              height: 40,
            },
          }}
        />
        <CustomOverlayMap position={placePosition}>
          <div className='mt-4 text-xs font-bold text-shadow-border'>{place.place_name}</div>
        </CustomOverlayMap>
      </Map>

      <div className='p-container'>
        <h2 className='text-xl font-bold'>{place.place_name}</h2>
        <p className='mt-1 text-sm text-al-slate'>{place.address_name}</p>
      </div>

      <div className='h-2 bg-al-gray-100' />

      <div className='p-container'>
        <IconTitle icon='Money' text='요금정보' />
      </div>

      <div className='mx-container border-y border-al-border py-container'>
        <IconTitle icon='Schedule' text='운영정보' />
      </div>

      <div className='p-container'>
        <IconTitle icon='Description' text='기타정보' />
      </div>

      <div className='flex gap-1 px-container'>
        {isSelected ? (
          <>
            <Button className='flex-1' variant='outline'>
              수정
            </Button>
            <Button className='flex-1' variant='destructive' onClick={removeCarPark}>
              삭제
            </Button>
          </>
        ) : (
          <Button className='flex-1' onClick={selectCarPark}>
            추가하기
          </Button>
        )}
      </div>
    </div>
  );
}

function CarParkSearch() {
  const hideCarParkSearch = useCarParkSearch((s) => s.hideCarParkSearch);
  const showCarParkDetail = useCarParkDetail((s) => s.showCarParkDetail);

  const handleClickSearchItem = () => {
    hideCarParkSearch();
    // showCarParkDetail();
  };

  return (
    <div className='container fixed inset-0 z-40 bg-white'>
      <div className='sticky top-0 flex h-12 items-center gap-3 border-b border-al-border px-container'>
        <BackButton onClick={hideCarParkSearch} />
        <input placeholder='계약한 주차장 검색' className='flex-1 focus:outline-none' autoFocus />
      </div>

      <div>
        <div
          className='mx-container flex items-center justify-between border-b border-al-border py-container'
          onClick={handleClickSearchItem}
        >
          <div>
            <p className='text-base font-bold'>(주) 오라이 좋아 2</p>
            <span className='text-sm text-al-slate'>서울 송파구 마천동 215-0</span>
          </div>
          <Icons.ChevronRight className='h-5 w-5 text-al-disabled' />
        </div>
      </div>
    </div>
  );
}
