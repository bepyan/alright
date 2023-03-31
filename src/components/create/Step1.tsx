import axios from 'axios';
import { useState } from 'react';

import useSearch from '~/lib/useSearch';
import { KPlace, KPlaceSearchRes } from '~/types';
import Input from '~/ui/Input';
import Label from '~/ui/Label';
import { RadioGroup, RadioGroupItem } from '~/ui/RadioGroup';
import StepNav from '~/ui/StepNav';

import { useCreate } from './state';

export default function Step1() {
  const [placeList, setPlaceList] = useState<KPlace[]>();
  const [loading, setLoading] = useState(false);

  const { searchHandler } = useSearch((searchValue) => {
    if (!searchValue) return;

    setLoading(true);
    axios('/api/search/keyword', {
      params: {
        query: searchValue,
      },
    })
      .then(({ data }: { data: KPlaceSearchRes }) => {
        setLoading(false);
        setPlaceList(data.documents);
      })
      .catch((e) => console.error(e));
  });

  const selectedValue = useCreate((s) => s.company?.id);
  const selectCompany = useCreate((s) => s.selectCompany);

  const valueChangeHandler = (value: string) => {
    const place = placeList?.find((v) => v.id === value);
    selectCompany(place);
  };

  return (
    <>
      <div className='space-y-3 p-container pt-3'>
        <StepNav currentStep={1} />
        <h2 className='text-xl font-bold'>업체 주소를 선택해주세요.</h2>
        <Input placeholder='업체 이름 검색' onChange={searchHandler} />
      </div>
      <div className='border-t border-al-border'>
        <RadioGroup value={selectedValue} onValueChange={valueChangeHandler}>
          {loading ? (
            <div className='spinner mx-auto mt-8' />
          ) : (
            placeList &&
            (placeList.length ? (
              placeList.map((place, i) => <SearchItem key={i} place={place} />)
            ) : (
              <div className='pt-12 text-center text-al-disabled'>검색 결과가 없습니다.</div>
            ))
          )}
        </RadioGroup>
      </div>
    </>
  );
}

function SearchItem({ place }: { place: KPlace }) {
  return (
    <div className='mx-container flex items-center justify-between border-b border-al-border py-container'>
      <Label htmlFor={place.id} className='w-full'>
        <div className='text-base font-bold'>{place.place_name}</div>
        <span className='text-sm text-al-slate'>{place.address_name}</span>
      </Label>
      <RadioGroupItem value={place.id} id={place.id} />
    </div>
  );
}
