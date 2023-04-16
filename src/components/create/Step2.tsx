import { useEffect, useState } from 'react';
import { Map, MarkerClusterer } from 'react-kakao-maps-sdk';

import { transferPosition } from '~/lib/utils';
import { KPlace } from '~/types';
import { Icons } from '~/ui/Icons';
import IconTitle from '~/ui/IconTitle';
import { InputFrame } from '~/ui/Input';
import MapMarker from '~/ui/MapMarker';
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
  const showCarParkDetail = useCarParkDetail((s) => s.showCarParkDetail);
  const showCarParkSearch = useCarParkSearch((s) => s.showCarParkSearch);
  const editPassLinked = useCarParkDetail((s) => s.setShowLinked);

  const [map, setMap] = useState<kakao.maps.Map>();
  const [nearCarParkList, setNearCarParkList] = useState<KPlace[]>([]);

  useEffect(() => {
    if (!map) return;

    const ps = new kakao.maps.services.Places();
    ps.categorySearch(
      'PK6',
      (data, status, _pagination) => {
        if (status !== kakao.maps.services.Status.OK) {
          return;
        }

        setNearCarParkList(data);
      },
      {
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
        <MarkerClusterer averageCenter={true} minLevel={4}>
          {nearCarParkList.map((item) => {
            const selected = selectedCarParkList.find((v) => v.id === item.id);
            const isSelected = !!selected;

            const onClick = () => {
              if (isSelected) {
                editPassLinked(!selected.parkingCode);
                showCarParkDetail(selected);
              } else {
                showCarParkDetail(item);
              }
            };

            return (
              <MapMarker
                key={item.id}
                type={isSelected ? 'parkSubSelected' : 'parkSub'}
                position={transferPosition(item)}
                text={item.place_name}
                onClick={onClick}
              />
            );
          })}
        </MarkerClusterer>
        <MapMarker position={companyPosition} type='companyMain' text={company.place_name} />
      </Map>

      {!!selectedCarParkList.length && (
        <div className='p-container'>
          <IconTitle icon='Check' text='추가한 주차장' className='text-al-blue' />
          <div className='mt-container rounded-xl border border-al-blue space:border-t'>
            {selectedCarParkList.map((item) => (
              <CarParkItem
                key={`selected-place-${item.id}`}
                item={item}
                onClick={() => {
                  editPassLinked(!item.parkingCode);
                  showCarParkDetail(item);
                }}
              />
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
              <CarParkItem
                key={`place-${item.id}`}
                item={item}
                onClick={() => showCarParkDetail(item)}
              />
            ))}
        </div>
      </div>

      {showDetail && <CarParkDetail />}
      {showSearch && <CarParkSearch />}
    </>
  );
}

function CarParkItem({ item, onClick }: { item: KPlace; onClick: () => void }) {
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
