import { Map } from 'react-kakao-maps-sdk';

import { transferPosition } from '~/lib/utils';
import BackButton from '~/ui/BackButton';
import Button from '~/ui/Button';
import IconTitle from '~/ui/IconTitle';
import MapMarker from '~/ui/MapMarker';
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
        <MapMarker type='parkMain' position={placePosition} text={place.place_name} />
        <MapMarker type='companySub' position={companyPosition} text={company.place_name} />
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
