import { Input } from '~/ui/Input';
import StepNav from '~/ui/StepNav';

export default function Step1() {
  return (
    <>
      <div className='space-y-3 p-container pt-3'>
        <StepNav currentStep={1} />
        <h2 className='text-xl font-bold'>업체 주소를 선택해주세요.</h2>
        <Input placeholder='업체 이름 검색' />
      </div>
      <div className='border-t' />
    </>
  );
}
