import { GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';

import ParkDetail from '~/components/park/CarParkDetail';
import CarParkListItem from '~/components/park/CarParkListItem';
import { useCarParkDetail } from '~/components/park/state';
import { useCurrentGeolocation } from '~/lib/useGeolocation';
import { cn, convertToString, transferPosition, wrapJSON } from '~/lib/utils';
import { Alright, ParkingLotInfo } from '~/models/alright';
import { getParkingLot } from '~/services/parking-lot';
import { Icons } from '~/ui/Icons';
import MapMarker from '~/ui/MapMarker';

export const getServerSideProps = async ({ res, params }: GetServerSidePropsContext) => {
  const slug = params?.slug;

  if (!slug) {
    res.statusCode = 404;
    return { notFound: true };
  }

  try {
    const data = await getParkingLot(convertToString(slug));

    if (!data) {
      res.statusCode = 404;
      return { notFound: true };
    }

    const alright = wrapJSON<Alright>(data);

    return { props: { alright } };
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    return { notFound: true };
  }
};

export default function Page({ alright }: { alright: Alright }) {
  const company = useCarParkDetail((s) => s.company);
  const companyPosition = transferPosition(company);
  const carParkList = useCarParkDetail((s) => s.carParkList);
  const focusedCarPark = useCarParkDetail((s) => s.focusedCarPark);
  const isShowCarParkDetail = useCarParkDetail((s) => s.isShowCarParkDetail);
  const loadCarParkDetail = useCarParkDetail((s) => s.loadCarParkDetail);
  const showCarParkDetail = useCarParkDetail((s) => s.showCarParkDetail);
  const setFocusedCarPark = useCarParkDetail((s) => s.setFocusedCarPark);

  const currentPosition = useCurrentGeolocation();
  const [map, setMap] = useState<kakao.maps.Map>();

  const mapMoveToCurrentPosition = () => {
    if (!currentPosition) return;

    map?.setLevel(2);
    map?.panTo(new kakao.maps.LatLng(currentPosition.lat, currentPosition.lng));
  };

  const mapMoveToCompany = () => {
    map?.setLevel(2);
    map?.panTo(new kakao.maps.LatLng(companyPosition.lat, companyPosition.lng));
  };

  const mapMoveToCarPark = (target: ParkingLotInfo) => {
    setFocusedCarPark(target);

    const pos = transferPosition(target);
    map?.setLevel(2);
    map?.panTo(new kakao.maps.LatLng(pos.lat, pos.lng));
  };

  const mapMarkerClickHandler = (target: ParkingLotInfo) => {
    if (target._id !== focusedCarPark?._id) {
      mapMoveToCarPark(target);
      return;
    }

    showCarParkDetail(target);
  };

  useEffect(() => {
    loadCarParkDetail(alright);
  }, []);

  // const { data } = useQuery({
  //   queryKey: ['alright', alright.hashCode],
  //   queryFn: () =>
  //     axios<PlaceRealtimeInfo[]>({
  //       url: `/api/parking-lot/realtime`,
  //       params: {
  //         codeList: alright.parkingLots
  //           .filter((item) => !!item.parkingCode)
  //           .map((item) => item.parkingCode)
  //           .join(','),
  //       },
  //     }).then((res) => res.data),
  // });

  // console.log(data);

  return (
    <div className='container fixed inset-0 overflow-hidden'>
      <div
        className={cn(
          'container absolute inset-0 transition-transform',
          isShowCarParkDetail ? '-translate-x-full' : 'translate-x-0',
        )}
      >
        <div className='relative h-1/2'>
          <Map center={companyPosition} level={2} className='h-full w-full' onCreate={setMap}>
            {currentPosition && <MapMarker position={currentPosition} type='currentPlace' />}
            <MapMarker position={companyPosition} type='companyMain' text={company.place_name} />
            {carParkList.map((item) => (
              <MapPlaceMarker
                key={'marker_' + item.id}
                variant={item._id === focusedCarPark?._id ? 'primary' : 'secondary'}
                position={transferPosition(item)}
                text='P'
                onClick={() => mapMarkerClickHandler(item)}
              />
            ))}
          </Map>
          <FloatButton className='mb-12' onClick={mapMoveToCurrentPosition}>
            <Icons.Locate className='h-6 w-6' />
          </FloatButton>
          {/* <FloatButton className='mb-12'>
            <Icons.Refresh className='h-6 w-6' />
          </FloatButton> */}
          <FloatButton className='h-10 px-3 text-xs font-bold' onClick={mapMoveToCompany}>
            업체 위치 바로가기
          </FloatButton>
        </div>
        <div className='h-1/2 w-full overflow-scroll'>
          {carParkList.map((item) => (
            <CarParkListItem
              key={'list_' + item.id}
              item={item}
              focused={item._id === focusedCarPark?._id}
              onClick={mapMoveToCarPark}
            />
          ))}
        </div>
      </div>
      <div
        className={cn(
          'container absolute inset-0 transition-transform',
          isShowCarParkDetail ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <ParkDetail />
      </div>
    </div>
  );
}

function FloatButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        'absolute right-container bottom-container z-10 rounded-full border border-[#E2E2E2] bg-white p-2 shadow',
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
