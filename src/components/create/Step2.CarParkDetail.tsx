import { Map } from 'react-kakao-maps-sdk';

import { transferPosition } from '~/lib/utils';
import BackButton from '~/ui/BackButton';
import MapMarker from '~/ui/MapMarker';

import { useCreate } from './state';
import CarParkDetailEdit from './Step2.CarParkDetailEdit';
import CarParkDetailLinkage from './Step2.CarParkDetailLinkage';
import { useCarParkDetail } from './Step2.state';

export default function CarParkDetail() {
  const company = useCreate((s) => s.company)!;
  const companyPosition = transferPosition(company);
  const targetPlace = useCarParkDetail((s) => s.targetPlace)!;
  const targetPlacePosition = transferPosition(targetPlace);
  const isPassLinked = useCarParkDetail((s) => s.isPassLinked);
  const hideCarParkDetail = useCarParkDetail((s) => s.hideCarParkDetail);

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

      <Map center={targetPlacePosition} className='h-48 w-full'>
        <MapMarker type='parkMain' position={targetPlacePosition} text={targetPlace.place_name} />
        <MapMarker type='companySub' position={companyPosition} text={company.place_name} />
      </Map>

      <div className='p-container'>
        <h2 className='text-xl font-bold'>{targetPlace.place_name}</h2>
        <p className='mt-1 text-sm text-al-slate'>{targetPlace.address_name}</p>
      </div>

      <div className='h-2 bg-al-gray-100' />

      <CarParkDetailLinkage />
      {(targetPlace.parkingCode || isPassLinked) && <CarParkDetailEdit />}
    </div>
  );
}
