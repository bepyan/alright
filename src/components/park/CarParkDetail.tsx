import { isMobile } from 'react-device-detect';

import { useCurrentGeolocation } from '~/lib/useGeolocation';
import { ParkingLotInfo } from '~/models/alright';
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
      {selectedCarPark && <ParkDetail selectedCarPark={selectedCarPark} />}
    </div>
  );
}

function ParkDetail({ selectedCarPark }: { selectedCarPark: ParkingLotInfo }) {
  const company = useCarParkDetail((s) => s.company);
  const currentPosition = useCurrentGeolocation();

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ['carParkDetail', selectedCarPark?.id],
  //   queryFn: () =>
  //     selectedCarPark &&
  //     axios({
  //       url: '/api/parking-lot/public',
  //       method: 'GET',
  //       params: { address: selectedCarPark.address_name },
  //     }).then((res) => res.data),
  // });

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

  const navToPark = () => {
    if (isMobile) {
      if (currentPosition) {
        location.href = `kakaomap://route?sp=${currentPosition.lat},${currentPosition.lng}&ep=${selectedCarPark.y},${selectedCarPark.x}&by=CAR`;
      } else {
        location.href = `kakaomap://place?id=${selectedCarPark.id}`;
      }
    } else {
      window.open(`https://map.kakao.com/link/to/${selectedCarPark.id}`, '_ blank');
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
    <>
      <div className='flex flex-col bg-al-gray-100 p-container'>
        <h1 className='mt-5 self-center text-2xl font-bold'>{selectedCarPark.place_name}</h1>
        <div className='mt-5 flex h-[100px] items-center rounded-lg bg-white'>
          <div className='flex-1 text-center font-bold text-al-blue'>
            <div className='text-2xl'>{117}</div>
            <div className='text-sm'>주차 여유</div>
          </div>
          <Separator height={40} />
          <div className='flex-1 text-center font-bold text-al-slate'>
            <div className='text-2xl'>{217}</div>
            <div className='text-sm'>전체</div>
          </div>
        </div>
        <Button className='mt-3' onClick={navToPark}>
          길찾기
        </Button>
      </div>

      <div className='bg-white py-2'>
        {selectedCarPark.phone && (
          <div className='flex items-center py-2 px-5'>
            <Icons.Phone className='text-al-slate' />
            <div className='ml-1 text-sm'>{selectedCarPark.phone}</div>
            <Button className='ml-auto rounded-full' size='xs' variant='subtle'>
              전화하기
            </Button>
          </div>
        )}
        <div className='flex items-center py-2 px-5'>
          <Icons.Location className='text-al-slate' />
          <div className='ml-1 text-sm'>{selectedCarPark.address_name}</div>
          <Button
            className='ml-auto rounded-full'
            size='xs'
            variant='subtle'
            onClick={navToKakaoMap}
          >
            지도보기
          </Button>
        </div>
        <div className='flex items-center py-2 px-5'>
          <Icons.Route className='text-al-slate' />
          <div className='ml-1 text-sm'>걸어서 업체가는 방법</div>
          <Button
            className='ml-auto rounded-full'
            size='xs'
            variant='subtle'
            onClick={navToCompany}
          >
            카카오맵
          </Button>
        </div>
      </div>

      <div className='mt-2 bg-white px-5 pt-1 pb-6'>
        <div className='space:border-t space:border-al-border'>
          <div className='py-4'>
            <div className='mb-4 flex items-center gap-1'>
              <Icons.Money className='text-al-slate-dark' />
              <div className='text-base font-bold'>요금 정보</div>
            </div>
            <div className='flex flex-col gap-2'>
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

          <div className='py-4'>
            <div className='mb-4 flex items-center gap-1'>
              <Icons.Clock className='text-al-slate-dark' />
              <div className='text-base font-bold'>운영 정보</div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center text-sm'>
                <div className=''>평일</div>
                <div className='ml-auto'>
                  {selectedCarPark.weekdaysStartTime ?? '00:00'} ~{' '}
                  {selectedCarPark.weekdaysEndTime ?? '00:00'}
                </div>
              </div>
              {selectedCarPark.satStartTime && selectedCarPark.satEndTime && (
                <div className='flex items-center text-sm'>
                  <div className=''>토요일</div>
                  <div className='ml-auto'>
                    {selectedCarPark.satStartTime} ~ {selectedCarPark.satEndTime}
                  </div>
                </div>
              )}
              {selectedCarPark.sunStartTime && selectedCarPark.sunEndTime && (
                <div className='flex items-center text-sm'>
                  <div className=''>일요일</div>
                  <div className='ml-auto'>
                    {selectedCarPark.sunStartTime} ~ {selectedCarPark.sunEndTime}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='py-4'>
            <div className='mb-4 flex items-center gap-1'>
              <Icons.File className='text-al-slate-dark' />
              <div className='text-base font-bold'>기타 정보</div>
            </div>
            <pre className='whitespace-pre-wrap font-sans text-sm leading-[22px]'>
              {selectedCarPark.otherInfo ?? '없음'}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
