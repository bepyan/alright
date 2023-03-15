import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

import useWindowDimensions from '~/lib/useWindowDimensions';
import Button from '~/ui/Button';
import HeaderNav from '~/ui/HeaderNav';
import { Icons } from '~/ui/Icons';
import Pictures from '~/ui/Pictures';

export default function Page() {
  const [page, setPage] = useState(1);

  const { height } = useWindowDimensions();

  return (
    <>
      <HeaderNav className='h-14'>
        <div className='flex items-center gap-2'>
          <Icons.Logo className='h-6 w-6' />
          <span className='font-bold'>오라이</span>
        </div>
        <AnimatePresence initial={false}>
          {page > 1 && (
            <motion.div
              key='create-button'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link href='/create'>
                <Button size='sm' className='rounded-full'>
                  무료로 이용하기
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </HeaderNav>
      <motion.main
        className='container fixed overflow-hidden'
        style={{
          transform: `translateY(${-(height ?? 0) * (page - 1)}px)`,
          transition: 'transform 0.9s ease 0s',
        }}
        onPanEnd={(_, { offset, velocity }) => {
          const swipe = Math.abs(offset.y) * velocity.y;

          if (swipe <= -30) {
            page < 4 && setPage(page + 1);
          } else if (swipe >= 30) {
            page > 1 && setPage(page - 1);
          }
        }}
      >
        <SectionOne />
        <SectionTwo />
        <SectionTree />
        <SectionFour />
        {/* <Footer /> */}
      </motion.main>
    </>
  );
}

function usePictureSize() {
  const dimension = useWindowDimensions();
  const width = Math.min(dimension.width ?? 0, 640);

  return { width, height: width / 1.171875 };
}

function SectionOne() {
  return (
    <div className='flex h-screen flex-col bg-al-gray-100'>
      <h2
        className='text-center font-bold'
        style={{
          fontSize: '32px',
          lineHeight: '42px',
          paddingTop: '28%',
        }}
      >
        주차장 위치를
        <br />
        오라이 링크로
        <br />
        간편하게 안내하세요
      </h2>

      <Link className='mx-auto' href='/create' style={{ marginTop: '12%' }}>
        <Button className='rounded-full px-6'>무료로 이용하기</Button>
      </Link>

      <Pictures.Landing1 className='mx-auto mt-auto' />
    </div>
  );
}

function SectionTwo() {
  return (
    <div className='flex h-screen flex-col'>
      <div className='px-8' style={{ paddingTop: '28%' }}>
        <h2 className='text-3xl font-bold'>
          문자와 업체 정보에
          <br />
          오라이 링크를
          <br />
          함께 첨부하세요
        </h2>
        <p style={{ marginTop: '6%' }}>
          고객이 문의할 필요없게 업체 주차장 링크를 문자, 네이버지도, 인스타 등에 올려주세요.
        </p>
      </div>
      <Pictures.Landing2 className='mx-auto mt-auto' />
    </div>
  );
}

function SectionTree() {
  const size = usePictureSize();

  return (
    <div
      className='flex h-screen flex-col'
      style={{ paddingTop: '28%', backgroundColor: '#EDF3FB' }}
    >
      <div className='px-8'>
        <div className='inline-flex h-9 items-center justify-start rounded-lg bg-black px-3'>
          <span className='text-sm font-bold text-white'>PRO요금</span>
        </div>
        <h2 className='text-3xl font-bold' style={{ marginTop: '6%' }}>
          주차장 실시간 현황을
          <br />
          확인하세요
        </h2>
        <p style={{ marginTop: '6%' }}>
          고객이 주차장에 자리가 얼마나 남아있는지 실시간으로 확인할 수 있어요.
        </p>
      </div>

      <Pictures.Landing3 className='mt-auto' {...size} />
    </div>
  );
}

function SectionFour() {
  const size = usePictureSize();

  return (
    <div className='flex h-screen flex-col' style={{ paddingTop: '28%' }}>
      <div className='px-8'>
        <div className='inline-flex h-9 items-center justify-start rounded-lg bg-black px-3'>
          <span className='text-sm font-bold text-white'>PRO요금</span>
        </div>
        <h2 className='text-3xl font-bold' style={{ marginTop: '6%' }}>
          자동으로 제공하는
          <br />
          주차할인 서비스
        </h2>
        <p style={{ marginTop: '6%' }}>
          직접 주차 할인해드리느라 불편하셨죠? <br />
          한번 설정해놓으면 오라이 링크 문자를 받은 손님은 자동주차할인을 받을 수 있어요.
        </p>
      </div>

      <Pictures.Landing4 className='mt-auto' {...size} />
    </div>
  );
}

// function Footer() {
//   return (
//     <footer className='p-container' style={{ backgroundColor: '#545C6A' }}>
//       FOOTER
//     </footer>
//   );
// }
