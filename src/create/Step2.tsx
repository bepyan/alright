import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';

import { transferPosition } from '~/lib/utils';
import { Place } from '~/types/place';
import { Icons } from '~/ui/Icons';
import IconTitle from '~/ui/IconTitle';
import { InputFrame } from '~/ui/Input';
import StepNav from '~/ui/StepNav';

import { useCreate } from './state';
import CarParkDetail from './Step2.CarParkDetail';
import CarParkSearch from './Step2.CarParkSearch';
import { useCarParkDetail, useCarParkSearch } from './Step2.state';

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

      <Map center={companyPosition} className='h-52 w-full' level={2} onCreate={setMap}>
        {nearCarParkList.map((marker) => {
          const isSelected = selectedCarParkList.some((v) => v.id === marker.id);

          return (
            <MapMarker
              key={`icon-${marker.id}`}
              position={transferPosition(marker)}
              image={{
                src: isSelected
                  ? "data:image/svg+xml,%3Csvg width='24' height='32' viewBox='0 0 24 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse opacity='0.3' cx='12' cy='30' rx='4' ry='2' fill='black'/%3E%3Cpath d='M24 12.1519C24 20.8861 12 30 12 30C12 30 0 20.8861 0 12.1519C0 5.44059 5.37258 0 12 0C18.6274 0 24 5.44059 24 12.1519Z' fill='%230C79FE'/%3E%3Cpath d='M16.4784 9.73608L10.8215 15.3929L7.0503 11.6217' stroke='white' stroke-width='2'/%3E%3C/svg%3E%0A"
                  : "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='11.25' fill='%2363C7F1' stroke='white' stroke-width='1.5'/%3E%3Cpath d='M9 17.36H11.072V13.678H12.458C14.684 13.678 16.448 12.628 16.448 10.262C16.448 7.798 14.684 7 12.402 7H9V17.36ZM11.072 12.04V8.652H12.248C13.676 8.652 14.432 9.044 14.432 10.262C14.432 11.438 13.746 12.04 12.318 12.04H11.072Z' fill='white'/%3E%3C/svg%3E%0A",
                size: {
                  width: 24,
                  height: 24,
                },
              }}
            />
          );
        })}
        {nearCarParkList.map((marker) => (
          <CustomOverlayMap key={`text-${marker.id}`} position={transferPosition(marker)}>
            <div className='relative w-20 text-xs font-bold text-shadow-border'>
              <div className='absolute top-1 w-full whitespace-normal break-keep text-center'>
                {marker.place_name}
              </div>
            </div>
          </CustomOverlayMap>
        ))}

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
          <div className='mt-4 w-20 whitespace-normal text-center text-xs font-bold text-shadow-border'>
            {company.place_name}
          </div>
        </CustomOverlayMap>
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
          {nearCarParkList
            .filter((item) => !selectedCarParkList.some((v) => v.id === item.id))
            .map((item) => (
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
      className='flex items-center justify-between border-al-border p-container pr-3'
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
