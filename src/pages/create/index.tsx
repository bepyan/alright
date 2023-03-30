import HeaderNavContent from '~/components/create/HeaderNavContent';
import { useCreate } from '~/components/create/state';
import Step1 from '~/components/create/Step1';
import Step2 from '~/components/create/Step2';
import Step3 from '~/components/create/Step3';
import HeaderNav from '~/ui/HeaderNav';

export default function Page() {
  const step = useCreate((state) => state.step);

  return (
    <>
      <HeaderNav className='h-12'>
        <HeaderNavContent />
      </HeaderNav>
      <main className='container h-screen pt-12'>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </main>
    </>
  );
}
