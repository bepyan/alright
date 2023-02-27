import StepNav from '~/ui/StepNav';

export default function Step3() {
  return (
    <div>
      <div className='space-y-3 p-container pt-3'>
        <StepNav currentStep={3} />
        <div>
          <h2 className='text-xl font-bold'>주차 정보 링크가 생성되었어요!</h2>
          <p className='mt-1.5 text-al-slate'>링크를 복사해서 업체 소개 페이지에 공유해보세요.</p>
        </div>
      </div>
    </div>
  );
}
