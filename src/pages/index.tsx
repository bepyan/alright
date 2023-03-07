import { useRouter } from 'next/navigation';

import Button from '~/ui/Button';
import HeaderNav from '~/ui/HeaderNav';
import { Icons } from '~/ui/Icons';
import Pictures from '~/ui/Pictures';

export default function Page() {
  const router = useRouter();

  return (
    <>
      <HeaderNav className='flex h-14 items-center justify-between'>
        <Icons.Logo className='h-6 w-6' />
        <div onClick={() => router.push('/create')}>주차장 만들기</div>
      </HeaderNav>
      <main className=''>
        <SectionOne />
        <SectionTwo />
        <SectionTree />
        <SectionFour />
        <Footer />
      </main>
    </>
  );
}

function SectionOne() {
  return (
    <div className='bg-al-gray-100 pt-20 text-center'>
      <h2 className='text-3xl font-bold'>
        주차장 위치를
        <br />
        오라이 링크로
        <br />
        간편하게 안내하세요
      </h2>

      <Button size='default' className='mt-8'>
        무료로 이용하기
      </Button>

      <Pictures.Landing1 className='mt-auto' />
    </div>
  );
}

function SectionTwo() {
  return (
    <div className='pt-20'>
      <div className='px-container'>
        <h2 className='text-3xl font-bold'>
          문자와 업체 정보에
          <br />
          오라이 링크를
          <br />
          함께 첨부하세요
        </h2>
        <p className='mt-3'>
          고객이 문의할 필요없게 업체 주차장 링크를 문자, 네이버지도, 인스타 등에 올려주세요.
        </p>
      </div>
      <Pictures.Landing2 className='mt-auto' />
    </div>
  );
}

function SectionTree() {
  return (
    <div className='pt-20' style={{ backgroundColor: '#EDF3FB' }}>
      <div className='px-container'>
        <div className='inline-flex h-9 items-center justify-start rounded-lg bg-black px-3'>
          <span className='text-sm font-bold text-white'>PRO요금</span>
        </div>
        <h2 className='mt-3 text-3xl font-bold'>
          주차장 실시간 현황을
          <br />
          확인하세요
        </h2>
        <p className='mt-3'>
          고객이 주차장에 자리가 얼마나 남아있는지 실시간으로 확인할 수 있어요.
        </p>
      </div>

      <Pictures.Landing3 className='mt-auto' />
    </div>
  );
}

function SectionFour() {
  return (
    <div className='pt-20'>
      <div className='px-container'>
        <div className='inline-flex h-9 items-center justify-start rounded-lg bg-black px-3'>
          <span className='text-sm font-bold text-white'>PRO요금</span>
        </div>
        <h2 className='mt-3 text-3xl font-bold'>
          자동으로 제공하는
          <br />
          주차할인 서비스
        </h2>
        <p className='mt-3'>
          직접 주차 할인해드리느라 불편하셨죠? 한번 설정해놓으면 오라이 링크 문자를 받은 손님은
          자동주차할인을 받을 수 있어요.
        </p>
      </div>

      <Pictures.Landing4 className='mt-auto' />
    </div>
  );
}

function Footer() {
  return (
    <footer className='p-container' style={{ backgroundColor: '#545C6A' }}>
      FOOTER
    </footer>
  );
}
