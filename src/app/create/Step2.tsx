import { Icons } from '~/ui/Icons';
import { Input } from '~/ui/Input';

export default function Step2() {
  return (
    <>
      <div className='space-y-3 p-container pt-3'>
        <div>step: {2}</div>
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
            <div className='flex items-center justify-between p-container'>
              <div>
                <p className='font-bold'>오라이 주차장</p>
                <p className='mt-1 text-sm'>서울 송파구 마청동 215-0</p>
              </div>
              <Icons.ChevronRightIcon className='h-5 w-5' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
