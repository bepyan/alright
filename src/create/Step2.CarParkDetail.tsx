import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';

import { transferPosition } from '~/lib/utils';
import BackButton from '~/ui/BackButton';
import Button from '~/ui/Button';
import IconTitle from '~/ui/IconTitle';
import TextArea from '~/ui/TextArea';

import { useCreate } from './state';
import { useCarParkDetail } from './Step2.state';

export default function CarParkDetail() {
  const place = useCarParkDetail((s) => s.targetPlace)!;
  const placePosition = transferPosition(place);
  const hideCarParkDetail = useCarParkDetail((s) => s.hideCarParkDetail);

  const company = useCreate((s) => s.company)!;
  const companyPosition = transferPosition(company);

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
    <div className='container fixed inset-0 z-50 overflow-y-scroll bg-white pb-12'>
      <div className='container fixed z-50 mt-1.5 ml-3.5'>
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
        <MapMarker
          position={companyPosition}
          image={{
            src: "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse opacity='0.3' cx='12' cy='22' rx='4' ry='2' fill='black'/%3E%3Cpath d='M21 8.91139C21 15.3165 12 22 12 22C12 22 3 15.3165 3 8.91139C3 3.98977 7.02944 0 12 0C16.9706 0 21 3.98977 21 8.91139Z' fill='%23F95E5E'/%3E%3C/svg%3E%0A",
            size: {
              width: 24,
              height: 24,
            },
          }}
        />
        <CustomOverlayMap position={companyPosition}>
          <div className='mt-4 text-xs font-bold text-shadow-border'>{company.place_name}</div>
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
        <TextArea className='mt-4' placeholder='고객님께 주차 꿀팁을 공유해주세요.' />
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
