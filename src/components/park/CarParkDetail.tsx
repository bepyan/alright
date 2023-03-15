import BackButton from '~/ui/BackButton';
import Button from '~/ui/Button';
import HeaderNav from '~/ui/HeaderNav';
import { Icons } from '~/ui/Icons';
import Separator from '~/ui/Separator';

import { useCarParkDetail } from './state';

export default function ParkDetail() {
  const selectedCarPark = useCarParkDetail((s) => s.selectedCarPark)!;
  const hideCarParkDetail = useCarParkDetail((s) => s.hideCarParkDetail);

  return (
    <div className='fixed inset-0 z-40 overflow-scroll bg-white'>
      <HeaderNav className='h-14'>
        <BackButton onClick={hideCarParkDetail} />
      </HeaderNav>

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
        <Button className='mt-3'>길찾기</Button>
      </div>

      <div className='bg-white py-2'>
        <div className='flex items-center py-2 px-5'>
          <Icons.Phone className='text-al-slate' />
          <div className='ml-1 text-sm'>02-430-7240</div>
          <Button className='ml-auto rounded-full' size='xs' variant='subtle'>
            전화하기
          </Button>
        </div>
        <div className='flex items-center py-2 px-5'>
          <Icons.Location className='text-al-slate' />
          <div className='ml-1 text-sm'>서울 송파구 마천동 215-0</div>
          <Button className='ml-auto rounded-full' size='xs' variant='subtle'>
            지도보기
          </Button>
        </div>
        <div className='flex items-center py-2 px-5'>
          <Icons.Location className='text-al-slate' />
          <div className='ml-1 text-sm'>걸어서 업체가는 방법</div>
          <Button className='ml-auto rounded-full' size='xs' variant='subtle'>
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
            <div className=' flex flex-col gap-2'>
              <div className='flex items-center text-sm'>
                <div className=''>기본 요금(시간)</div>
                <div className='ml-auto flex items-center gap-1.5'>
                  <span>{50}원</span>
                  <Separator />
                  <span>{5}분</span>
                </div>
              </div>
            </div>
          </div>

          <div className='py-4'>
            <div className='mb-4 flex items-center gap-1'>
              <Icons.Clock className='text-al-slate-dark' />
              <div className='text-base font-bold'>운영 정보</div>
            </div>
            <div className=' flex flex-col gap-2'>
              <div className='flex items-center text-sm'>
                <div className=''>평일</div>
                <div className='ml-auto'>24시간</div>
              </div>
              <div className='flex items-center text-sm'>
                <div className=''>토요일</div>
                <div className='ml-auto'>24시간</div>
              </div>
              <div className='flex items-center text-sm'>
                <div className=''>일요일</div>
                <div className='ml-auto'>24시간</div>
              </div>
              <div className='flex items-center text-sm'>
                <div className=''>공휴일</div>
                <div className='ml-auto'>24시간</div>
              </div>
            </div>
          </div>

          <div className='py-4'>
            <div className='mb-4 flex items-center gap-1'>
              <Icons.File className='text-al-slate-dark' />
              <div className='text-base font-bold'>기타 정보</div>
            </div>
            <pre className='whitespace-pre-wrap font-sans text-sm leading-[22px]'>
              주차장 운영시간 및 요금정보는 실제와 다를 수 있으며, 현장 확인 후 이용바랍니다.
              *월정기권 요금안내 (주간35,000원, 야간25,000원)
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
