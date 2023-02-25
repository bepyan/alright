import { Input } from '~/ui/Input';

export default function Step1() {
  return (
    <>
      <div className='space-y-3 p-container pt-3'>
        <div>step: {1}</div>
        <h2 className='text-xl font-bold'>업체 주소를 선택해주세요.</h2>
        <Input placeholder='업체 이름 검색' />
      </div>
      <div className='border-t' />
    </>
  );
}
