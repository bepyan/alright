import { toast } from 'react-hot-toast';

import { copyClipboard } from '~/lib/utils';
import Button from '~/ui/Button';
import Pictures from '~/ui/Pictures';
import StepNav from '~/ui/StepNav';

import { useCreate } from './state';

export default function Step3() {
  const company = useCreate((s) => s.company);
  const selectedCarParkList = useCreate((s) => s.selectedCarParkList);

  const copyHandler = () => {
    console.log({ company, selectedCarParkList });

    copyClipboard()
      .then(() => toast('링크가 복사되었습니다!'))
      .catch(() => toast.error('링크 복사가 실패되었습니다.'));
  };

  return (
    <>
      <section className='p-container pt-3'>
        <StepNav currentStep={3} />
        <h2 className='mt-3 text-xl font-bold'>주차 정보 링크가 생성되었어요!</h2>
        <p className='mt-1.5 text-al-slate'>링크를 복사해서 업체 소개 페이지에 공유해보세요.</p>
        <Pictures.CarPark className='mx-auto mt-20' />
        <Button className='mt-20 w-full' onClick={copyHandler}>
          무료로 링크 복사하기
        </Button>
      </section>

      <section className='bg-al-gray-100 px-container pt-16 pb-20'>
        <h2 className='text-center text-xl font-bold'>업그레이드된 기능 이용해보세요!</h2>
        <div className='mt-5 rounded-lg bg-white text-center'>
          <div className='p-container text-al-blue'>
            <p className='text-lg font-bold'>Pro</p>
            <div className='mt-2 text-3xl'>
              <b>5천원</b>/월
            </div>
          </div>
          <div className='border-t border-al-border p-container text-center font-bold'>
            <div>
              광고 제거
              <br />
              실시간 주차 현황 제공
              <br />
              자동 주차 할인 서비스 제공
            </div>
            <Button variant='subtle' className='mt-5 w-full'>
              시작하기
            </Button>
          </div>
          <div className='p-container' />
        </div>
      </section>
    </>
  );
}
