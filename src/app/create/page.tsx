'use client';
import HeaderNav from '~/ui/HeaderNav';

import HeaderNavContent from './HeaderNavContent';
import { useCreate } from './state';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

export default function Page() {
  const step = useCreate((state) => state.step);

  return (
    <>
      <HeaderNav className='h-12'>
        <HeaderNavContent />
      </HeaderNav>
      <main className='container pt-12'>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </main>
    </>
  );
}
