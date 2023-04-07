import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';

import useSearch from '~/lib/useSearch';
import { cn } from '~/lib/utils';
import { SeoulParkingPlace } from '~/types';
import HeaderNav from '~/ui/HeaderNav';
import { Icons } from '~/ui/Icons';
import Input from '~/ui/Input';

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchList, setSearchList] = useState<SeoulParkingPlace[]>();

  const { searchHandler } = useSearch((value) => {
    if (!value) return;

    setIsLoading(true);
    axios('/api/search/public-parking-lot', {
      params: {
        search: value,
      },
    })
      .then(({ data }: { data: SeoulParkingPlace[] }) => {
        setIsLoading(false);
        setSearchList(data);
      })
      .catch((e) => console.error(e));
  });

  return (
    <>
      <HeaderNav className={cn('h-14 bg-gradient-to-b from-white to-transparent')}>
        <Link href='/' className='flex items-center gap-2'>
          <Icons.LogoFull />
        </Link>
      </HeaderNav>
      <main className='container h-screen overflow-y-auto p-container pt-16'>
        <Input placeholder='서울 공영주차장 이름, 주소 검색' onChange={searchHandler} />
        <div className='mt-2'>
          {isLoading && <div className='spinner mx-auto mt-8' />}
          {!isLoading && searchList && (
            <>
              {searchList.map((item, i) => (
                <div key={i} className='p-4'>
                  <div className='font-bold'>{item.parking_name}</div>
                  <div className='text-sm'>{item.addr}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </main>
    </>
  );
}
