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
          <FloatButton className='bottom-20' onClick={moveMapPosition}>
            <Icons.Locate className='h-6 w-6' />
          </FloatButton>
          <FloatButton>
            <Icons.RefreshCw className='h-6 w-6' />
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

function PositionMarker() {
  return (
    <svg
      width='83'
      height='48'
      viewBox='0 0 83 48'
      fill='currentColor'
      stroke='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='1' y='1' width='81' height='30' rx='3' />
      <text>text</text>
      <rect x='1' y='1' width='81' height='30' rx='3' stroke-width='2' />
      <rect x='41' y='30' width='2' height='16' />
      <circle cx='42' cy='45' r='3' />
    </svg>
  );
}

function MapPlaceMarker({
  text,
  position,
  onClick,
}: {
  text?: string;
  position: {
    lat: number;
    lng: number;
  };
  onClick?: () => void;
}) {
  return (
    <CustomOverlayMap position={position}>
      <div className='mb-4 rounded border-2 border-al-blue bg-al-blue px-2 py-1.5 text-white'>
        <div className='w-full whitespace-nowrap break-keep text-center text-sm font-bold'>
          {text}
        </div>
      </div>
      <div className='h-4 w-1.5 bg-al-blue' />
      <div className='h-1.5 w-1.5 rounded bg-al-blue' />
    </CustomOverlayMap>
  );
}
