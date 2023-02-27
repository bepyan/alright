import { create } from 'zustand';

import { Icons } from '~/ui/Icons';
import { Input } from '~/ui/Input';
import StepNav from '~/ui/StepNav';

const useCarParkDetail = create<{
  show: boolean;
  showCarParkDetail: () => void;
  hideCarParkDetail: () => void;
}>((set) => ({
  show: false,
  showCarParkDetail: () => set((state) => ({ ...state, show: true })),
  hideCarParkDetail: () => set((state) => ({ ...state, show: false })),
}));

export default function Step2() {
  const show = useCarParkDetail((s) => s.show);
  const showCarParkDetail = useCarParkDetail((s) => s.showCarParkDetail);

  return (
    <>
      <div className='space-y-3 p-container pt-3'>
        <StepNav currentStep={2} />
        <h2 className='text-xl font-bold'>계약한 주차장을 모두 추가해주세요.</h2>
        <Input placeholder='계약한 주차장 검색' />
      </div>
      <div className='border-t p-container'>
        <div>
          <div className='flex items-center gap-1'>
            <Icons.LocateIcon className='h-5 w-5' />
            <span className='text-sm font-bold'>근처 주차장 추천</span>
          </div>
          <div className='mt-container rounded-xl border'>
            <div
              className='flex items-center justify-between p-container'
              onClick={showCarParkDetail}
            >
              <div>
                <p className='font-bold'>오라이 주차장</p>
                <p className='mt-1 text-sm'>서울 송파구 마청동 215-0</p>
              </div>
              <Icons.ChevronRightIcon className='h-5 w-5' />
            </div>
          </div>
        </div>
      </div>
      {show && <CarParkDetail />}
    </>
  );
}

function CarParkDetail() {
  const hideCarParkDetail = useCarParkDetail((s) => s.hideCarParkDetail);

  return (
    <div className='fixed inset-0 z-40 bg-white'>
      <div className='fixed top-1.5 left-2.5'>
        <div className='flex h-9 w-9 items-center justify-center rounded-full bg-white'>
          <Icons.ChevronLeftIcon className='h-6 w-6' onClick={hideCarParkDetail} />
        </div>
      </div>
      <div className='h-48 bg-red-100' />
    </div>
  );
}
