import Button from '~/ui/Button';
import Pictures from '~/ui/Pictures';
import StepNav from '~/ui/StepNav';

export default function Step3() {
  return (
    <>
      <div className='p-container pt-3'>
        <StepNav currentStep={3} />
        <h2 className='mt-3 text-xl font-bold'>주차 정보 링크가 생성되었어요!</h2>
        <p className='mt-1.5 text-al-slate'>링크를 복사해서 업체 소개 페이지에 공유해보세요.</p>
        <Pictures.CarPark className='mx-auto mt-20' />
        <Button className='mt-20 w-full'>무료로 링크 복사하기</Button>
      </div>
      <div className='mt-16 text-center' />
    </>
  );
}
