import { isMobile } from 'react-device-detect';

import { useCurrentGeolocation } from '~/lib/useGeolocation';
import BackButton from '~/ui/BackButton';
import Button from '~/ui/Button';
import HeaderNav from '~/ui/HeaderNav';
import { Icons } from '~/ui/Icons';
import Separator from '~/ui/Separator';

import { useCarParkDetail } from './state';

export default function ParkDetailLayout() {
  const selectedCarPark = useCarParkDetail((s) => s.selectedCarPark);
  const hideCarParkDetail = useCarParkDetail((s) => s.hideCarParkDetail);

  return (
    <div className='h-full overflow-scroll bg-white'>
      <HeaderNav className='h-14'>
        <BackButton onClick={hideCarParkDetail} />
      </HeaderNav>
      {selectedCarPark && <ParkDetail />}
    </div>
  );
}

function ParkDetail() {
  return (
    <>
      <HeaderInfo />

      <DefaultInfo />

      <div className='bg-white px-container'>
        <div className='h-[1px] bg-al-border' />
        <FeeInfo />
        <div className='h-[1px] bg-al-border' />
        <TimeInfo />
        <div className='h-[1px] bg-al-border' />
        <OtherInfo />
      </div>
    </>
  );
}

function HeaderInfo() {
  const currentPosition = useCurrentGeolocation();
  const selectedCarPark = useCarParkDetail((s) => s.selectedCarPark)!;

  const navToPark = () => {
    if (isMobile) {
      if (currentPosition?.lat && currentPosition?.lng) {
        location.href = `kakaomap://route?sp=${currentPosition.lat},${currentPosition.lng}&ep=${selectedCarPark.y},${selectedCarPark.x}&by=CAR`;
      } else {
        location.href = `kakaomap://place?id=${selectedCarPark.id}`;
      }
    } else {
      window.open(`https://map.kakao.com/link/to/${selectedCarPark.id}`, '_ blank');
    }
  };

  return (
    <div className='flex flex-col bg-al-gray-100 p-container'>
      <h1 className='mt-5 self-center text-2xl font-bold'>{selectedCarPark.place_name}</h1>
      {/* {isSelectedPublishCarPark ? <RealtimeParkInfo /> : <div className='h-10' />} */}
      <Button className='mt-10' onClick={navToPark}>
        길찾기
      </Button>
    </div>
  );
}

// function RealtimeParkInfo() {
//   const selectedCarPark = useCarParkDetail((s) => s.selectedCarPark)!;

//   const { data, error } = useQuery({
//     queryKey: ['carParkDetail', selectedCarPark.id],
//     queryFn: () =>
//       axios<PlaceRealtimeInfo[]>({
//         url: `/api/parking-lot/realtime`,
//         params: {
//           codeList: selectedCarPark.parkingCode,
//         },
//       }).then((res) => res.data[0]),
//   });

//   console.log(error);
//   console.log(data);

//   return (
//     <div className='mt-5 mb-3 flex h-[100px] items-center rounded-lg bg-white'>
//       <div className='flex-1 text-center font-bold text-al-blue'>
//         <div className='text-2xl'>{data?.isEnabled ? data?.currentCount - data.totalCount : 0}</div>
//         <div className='text-sm'>주차 여유</div>
//       </div>
//       <Separator height={40} />
//       <div className='flex-1 text-center font-bold text-al-slate'>
//         <div className='text-2xl'>{data?.totalCount}</div>
//         <div className='text-sm'>전체</div>
//       </div>
//     </div>
//   );
// }

function DefaultInfo() {
  const company = useCarParkDetail((s) => s.company);
  const selectedCarPark = useCarParkDetail((s) => s.selectedCarPark)!;

  const navToKakaoMap = () => {
    if (isMobile) {
      location.href = `kakaomap://look?p=${selectedCarPark.y},${selectedCarPark.x}`;
    } else {
      window.open(
        `https://map.kakao.com/link/map/${selectedCarPark.place_name},${selectedCarPark.y},${selectedCarPark.x}`,
        '_ blank',
      );
    }
  };

  const navToCompany = () => {
    if (isMobile) {
      location.href = `kakaomap://route?sp=${selectedCarPark.y},${selectedCarPark.x}&ep=${company.y},${company.x}&by=FOOT`;
    } else {
      window.open(`https://map.kakao.com/link/to/${company.id}`, '_ blank');
    }
  };

  return (
    <div className='bg-white p-container space:mt-4'>
      {selectedCarPark.phone && (
        <div className='flex items-center'>
          <Icons.Phone className='text-al-slate' />
          <div className='ml-1 text-sm'>{selectedCarPark.phone}</div>
          <Button className='ml-auto rounded-full' size='xs' variant='subtle'>
            전화하기
          </Button>
        </div>
      )}
      <div className='flex items-center'>
        <Icons.Location className='text-al-slate' />
        <div className='ml-1 text-sm'>{selectedCarPark.address_name}</div>
        <Button className='ml-auto rounded-full' size='xs' variant='subtle' onClick={navToKakaoMap}>
          지도보기
        </Button>
      </div>
      <div className='flex items-center'>
        <Icons.Route className='text-al-slate' />
        <div className='ml-1 text-sm'>걸어서 업체가는 방법</div>
        <Button className='ml-auto rounded-full' size='xs' variant='subtle' onClick={navToCompany}>
          카카오맵
        </Button>
      </div>
    </div>
  );
}

function FeeInfo() {
  const selectedCarPark = useCarParkDetail((s) => s.selectedCarPark)!;

  return (
    <div className='py-4'>
      <div className='mb-4 flex items-center gap-1.5'>
        <Icons.Money className='mt-0.5 text-al-slate-dark' />
        <div className='text-base font-bold'>요금 정보</div>
      </div>
      <div className='flex flex-col gap-2'>
        {!selectedCarPark.defaultFeeAmount && !selectedCarPark.additionFeeAmount && (
          <span className='text-sm'>없음</span>
        )}
        {selectedCarPark.defaultFeeAmount && (
          <div className=' flex flex-col gap-2'>
            <div className='flex items-center text-sm'>
              <div className=''>기본 요금(시간)</div>
              <div className='ml-auto flex items-center gap-1.5'>
                <span>{selectedCarPark.defaultFeeAmount}원</span>
                <Separator />
                <span>{selectedCarPark.defaultFeeTime}분</span>
              </div>
            </div>
          </div>
        )}
        {selectedCarPark.additionFeeAmount && (
          <div className=' flex flex-col gap-2'>
            <div className='flex items-center text-sm'>
              <div className=''>추가 요금(시간)</div>
              <div className='ml-auto flex items-center gap-1.5'>
                <span>{selectedCarPark.additionFeeAmount}원</span>
                <Separator />
                <span>{selectedCarPark.additionFeeTime}분</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TimeInfo() {
  const weekdayTimeRange = useCarParkDetail((s) => s.computed.weekdayTimeRange);
  const weekendTimeRange = useCarParkDetail((s) => s.computed.weekendTimeRange);
  const holidayTimeRange = useCarParkDetail((s) => s.computed.holidayTimeRange);

  return (
    <div className='py-4'>
      <div className='mb-4 flex items-center gap-1.5'>
        <Icons.Clock className='mt-0.5 text-al-slate-dark' />
        <div className='text-base font-bold'>운영 정보</div>
      </div>
      <div className='flex flex-col gap-2'>
        {!weekdayTimeRange && !weekendTimeRange && !holidayTimeRange && (
          <span className='text-sm'>없음</span>
        )}
        {weekdayTimeRange && (
          <div className='flex items-center text-sm'>
            <div className=''>평일</div>
            <div className='ml-auto'>{weekdayTimeRange}</div>
          </div>
        )}
        {weekendTimeRange && (
          <div className='flex items-center text-sm'>
            <div className=''>주말</div>
            <div className='ml-auto'>{weekendTimeRange}</div>
          </div>
        )}
        {holidayTimeRange && (
          <div className='flex items-center text-sm'>
            <div className=''>공휴일</div>
            <div className='ml-auto'>{holidayTimeRange}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function OtherInfo() {
  const selectedCarPark = useCarParkDetail((s) => s.selectedCarPark)!;

  return (
    <div className='py-4'>
      <div className='mb-4 flex items-center gap-1.5'>
        <Icons.File className='mt-0.5 text-al-slate-dark' />
        <div className='text-base font-bold'>기타 정보</div>
      </div>
      <pre className='whitespace-pre-wrap font-sans text-sm leading-[22px]'>
        {selectedCarPark.otherInfo ?? '없음'}
      </pre>
    </div>
  );
}
