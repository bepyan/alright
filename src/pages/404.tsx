import { motion } from 'framer-motion';

import HeaderNav from '~/ui/HeaderNav';
import { Icons } from '~/ui/Icons';

export default function Page() {
  return (
    <>
      <HeaderNav className='h-14'>
        <div className='flex items-center gap-2'>
          <Icons.LogoFull />
        </div>
      </HeaderNav>
      <motion.main className='container fixed overflow-hidden'>
        <div className='flex h-screen flex-col'>
          <div className='px-8' style={{ paddingTop: '28%' }}>
            <h2 className='text-center text-3xl font-black'>404</h2>
            <p className='text-center' style={{ marginTop: '6%' }}>
              접근한 페이지 경로를 확인해보세요.
            </p>
          </div>
        </div>
      </motion.main>
    </>
  );
}
