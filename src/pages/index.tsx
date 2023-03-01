import { useRouter } from 'next/navigation';

import HeaderNav from '~/ui/HeaderNav';
import { Icons } from '~/ui/Icons';

export default function Page() {
  const router = useRouter();

  return (
    <>
      <HeaderNav className='flex h-14 items-center justify-between'>
        <Icons.Logo className='h-6 w-6' />
        <div onClick={() => router.push('/create')}>주차장 만들기</div>
      </HeaderNav>
      <main className='pt-14'>
        <div className='p-4'>Landing Page</div>
        <div className='p-32'>box</div>
        <div className='p-32'>box</div>
        <div className='p-32'>box</div>
        <div className='p-32'>box</div>
        <div className='p-32'>box</div>
      </main>
    </>
  );
}
