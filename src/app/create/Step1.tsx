import Input from '~/ui/Input';
import Label from '~/ui/Label';
import { RadioGroup, RadioGroupItem } from '~/ui/RadioGroup';
import StepNav from '~/ui/StepNav';

import { useCreate } from './state';

export default function Step1() {
  const value = useCreate((s) => s.company?.name);
  const selectCompany = useCreate((s) => s.selectCompany);

  return (
    <>
      <div className='space-y-3 p-container pt-3'>
        <StepNav currentStep={1} />
        <h2 className='text-xl font-bold'>업체 주소를 선택해주세요.</h2>
        <Input placeholder='업체 이름 검색' />
      </div>
      <div className='border-t border-al-border'>
        <RadioGroup onValueChange={selectCompany} value={value}>
          <SearchItem />
          <div className='mx-container flex items-center justify-between border-b border-al-border py-container'>
            <Label htmlFor='r2' className='w-full'>
              <p className='text-base font-bold'>(주) 오라이 좋아 2</p>
              <span className='text-sm text-al-slate'>서울 송파구 마천동 215-0</span>
            </Label>
            <RadioGroupItem value='two' id='r2' />
          </div>
        </RadioGroup>
      </div>
    </>
  );
}

function SearchItem() {
  return (
    <div className='mx-container flex items-center justify-between border-b border-al-border py-container'>
      <Label htmlFor='r1' className='w-full'>
        <p className='text-base font-bold'>(주) 오라이 좋아</p>
        <span className='text-sm text-al-slate'>서울 송파구 마천동 215-0</span>
      </Label>
      <RadioGroupItem value='one' id='r1' />
    </div>
  );
}
