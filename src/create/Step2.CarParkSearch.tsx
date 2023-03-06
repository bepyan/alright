import axios from 'axios';
import { useState } from 'react';

import useSearch from '~/lib/useSearch';
import { Place, PlaceSearchRes } from '~/types';
import BackButton from '~/ui/BackButton';
import { Icons } from '~/ui/Icons';

import { useCarParkDetail, useCarParkSearch } from './Step2.state';

export default function CarParkSearch() {
  const [placeList, setPlaceList] = useState<Place[]>();
  const hideCarParkSearch = useCarParkSearch((s) => s.hideCarParkSearch);

  const { searchHandler } = useSearch((searchValue) => {
    if (!searchValue) return;

    axios('/api/search/keyword', {
      params: {
        query: searchValue,
      },
    })
      .then(({ data }: { data: PlaceSearchRes }) => {
        setPlaceList(data.documents);
      })
      .catch((e) => console.error(e));
  });

  return (
    <div className='container fixed inset-0 z-40 overflow-scroll bg-white'>
      <div className='sticky top-0 flex h-12 items-center gap-3 border-b border-al-border bg-white px-container'>
        <BackButton onClick={hideCarParkSearch} />
        <input
          placeholder='계약한 주차장 검색'
          className='flex-1 focus:outline-none'
          autoFocus
          onChange={searchHandler}
        />
      </div>

      <div>
        {placeList?.map((item) => (
          <SearchItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function SearchItem({ item }: { item: Place }) {
  const hideCarParkSearch = useCarParkSearch((s) => s.hideCarParkSearch);
  const showCarParkDetail = useCarParkDetail((s) => s.showCarParkDetail);

  const handleClickSearchItem = () => {
    hideCarParkSearch();
    showCarParkDetail(item);
  };

  return (
    <div
      className='mx-container flex items-center justify-between border-b border-al-border py-container'
      onClick={handleClickSearchItem}
    >
      <div>
        <p className='text-base font-bold'>{item.place_name}</p>
        <span className='text-sm text-al-slate'>{item.address_name}</span>
      </div>
      <Icons.ChevronRight className='h-5 w-5 text-al-disabled' />
    </div>
  );
}
