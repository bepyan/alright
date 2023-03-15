import { GetStaticPaths, GetStaticPropsContext } from 'next';

import ParkDetail from '~/components/park/CarParkDetail';
import CarParkListItem from '~/components/park/CarParkListItem';
import { useCarParkDetail } from '~/components/park/state';
import { _dummyCarPark } from '~/lib/dump';
import BackButton from '~/ui/BackButton';
import HeaderNav from '~/ui/HeaderNav';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: 'test' } }],
    fallback: false,
  };
};

export const getStaticProps = ({ params }: GetStaticPropsContext) => {
  console.log(params);
  return {
    props: {},
  };
};

export default function Page() {
  const isShowCarParkDetail = useCarParkDetail((s) => s.computed.isShowCarParkDetail);

  return (
    <>
      <HeaderNav className='h-14'>
        <div className=''>
          <BackButton
            className='flex h-9 w-9 items-center justify-center rounded-full bg-white'
            onClick={() => console.log('asdf')}
          />
        </div>
      </HeaderNav>
      <div className='h-screen'>
        <div className='container h-1/2 bg-blue-50' />
        <div>
          {[...Array(7)].map((_, i) => (
            <CarParkListItem key={i} item={_dummyCarPark} />
          ))}
        </div>
      </div>
      {isShowCarParkDetail && <ParkDetail />}
    </>
  );
}
