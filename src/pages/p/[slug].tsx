import { GetStaticPaths, GetStaticPropsContext } from 'next';
import React, { useState } from 'react';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';

import ParkDetail from '~/components/park/CarParkDetail';
import CarParkListItem from '~/components/park/CarParkListItem';
import { useCarParkDetail } from '~/components/park/state';
import { useCurrentGeolocation } from '~/lib/useGeolocation';
import { cn, transferPosition } from '~/lib/utils';
import { Icons } from '~/ui/Icons';
import MapMarker from '~/ui/MapMarker';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: 'test' } }],
    fallback: false,
  };
};

export const getStaticProps = ({ params }: GetStaticPropsContext) => {
  console.log(params);
  return {
    props: {},
  };
};

export default function Page() {
  const company = useCarParkDetail((s) => s.company);
  const companyPosition = transferPosition(company);
  const carParkList = useCarParkDetail((s) => s.carParkList);
  const isShowCarParkDetail = useCarParkDetail((s) => s.computed.isShowCarParkDetail);

  const currentPosition = useCurrentGeolocation();
  const [map, setMap] = useState<kakao.maps.Map>();

  const moveMapPosition = () => {
    if (!currentPosition) return;

    map?.panTo(new kakao.maps.LatLng(currentPosition.lat, currentPosition.lng));
  };

  return (
    <>
      <div className='container'>
        <div className='container fixed top-0 h-1/2'>
          <Map center={companyPosition} level={2} className='h-full w-full' onCreate={setMap}>
            {currentPosition && <MapMarker position={currentPosition} type='currentPlace' />}
            <MapMarker position={companyPosition} type='companyMain' text={company.place_name} />
            <MapPlaceMarker
              position={{
                lat: 37.5312061331283,
                lng: 126.971150136434,
              }}
              text='221대 여유'
            />
          </Map>
          <FloatButton className='bottom-16 mb-2' onClick={moveMapPosition}>
            <Icons.Locate className='h-6 w-6' />
          </FloatButton>
          <FloatButton>
            <Icons.Refresh className='h-6 w-6' />
          </FloatButton>
        </div>
        <div className='fixed bottom-0 h-1/2 w-full overflow-scroll'>
          {carParkList.map((item) => (
            <CarParkListItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      {isShowCarParkDetail && <ParkDetail />}
    </>
  );
}

function FloatButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        'absolute right-container bottom-container z-10 rounded-full border border-[#E2E2E2] bg-white p-2.5 shadow',
        className,
      )}
    />
  );
}

function MapPlaceMarker({
  text,
  position,
  variant = 'secondary',
  onClick,
}: {
  text?: string;
  variant?: 'primary' | 'secondary' | 'disabled';
  position: {
    lat: number;
    lng: number;
  };
  onClick?: () => void;
}) {
  return (
    <CustomOverlayMap position={position} clickable>
      <div
        className={cn(
          'w-full rounded border-2 px-2 py-1.5',
          'whitespace-nowrap break-keep text-center text-sm font-bold',
          variant === 'primary' && 'border-al-blue bg-al-blue text-white',
          variant === 'secondary' && 'border-al-slate bg-white text-black',
          variant === 'disabled' && 'border-al-gray-9 bg-[#DCDCDC] text-al-gray-7',
        )}
        onClick={onClick}
      >
        {text}
      </div>
      <div
        className={cn(
          'mx-auto h-2 w-0.5',
          variant === 'primary' && 'bg-al-blue',
          variant === 'secondary' && 'bg-al-slate',
          variant === 'disabled' && 'bg-al-gray-9',
        )}
      />
      <div
        className={cn(
          'mx-auto h-2 w-2 rounded',
          variant === 'primary' && 'bg-al-blue',
          variant === 'secondary' && 'bg-al-slate',
          variant === 'disabled' && 'bg-al-gray-9',
        )}
      />
    </CustomOverlayMap>
  );
}
