import { Map } from 'react-kakao-maps-sdk';

import { transferPosition } from '~/lib/utils';
import BackButton from '~/ui/BackButton';
import MapMarker from '~/ui/MapMarker';

import { useCreate } from './state';
import CarParkDetailEdit from './Step2.CarParkDetailEdit';
import CarParkDetailLinkage from './Step2.CarParkDetailLinkage';
import { useCarParkDetail } from './Step2.state';

export default function CarParkDetail() {
  const carPark = useCarParkDetail((s) => s.targetPlace)!;
  const carParkPosition = transferPosition(carPark);
  const seoulParkingPlace = useCarParkDetail((s) => s.seoulParkingPlace);
  const isPassLinked = useCarParkDetail((s) => s.isPassLinked);
  const hideCarParkDetail = useCarParkDetail((s) => s.hideCarParkDetail);

  const company = useCreate((s) => s.company)!;
  const companyPosition = transferPosition(company);

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

      <Map center={carParkPosition} className='h-48 w-full'>
        <MapMarker type='parkMain' position={carParkPosition} text={carPark.place_name} />
        <MapMarker type='companySub' position={companyPosition} text={company.place_name} />
      </Map>

      <div className='p-container'>
        <h2 className='text-xl font-bold'>{carPark.place_name}</h2>
        <p className='mt-1 text-sm text-al-slate'>{carPark.address_name}</p>
      </div>

      <div className='h-2 bg-al-gray-100' />

      <CarParkDetailLinkage />
      {(carPark.parkingCode || isPassLinked || seoulParkingPlace) && <CarParkDetailEdit />}
    </div>
  );
}
