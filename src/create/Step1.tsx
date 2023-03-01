import axios from 'axios';
import { useState } from 'react';

import useSearch from '~/lib/useSearch';
import { Place, PlaceSearchRes } from '~/types/place';
import Input from '~/ui/Input';
import Label from '~/ui/Label';
import { RadioGroup, RadioGroupItem } from '~/ui/RadioGroup';
import StepNav from '~/ui/StepNav';

import { useCreate } from './state';

export default function Step1() {
  const [placeList, setPlaceList] = useState<Place[]>([]);

  const { searchHandler } = useSearch((searchValue) => {
    if (!searchValue) return;

    axios('/api/search', {
      params: {
        query: searchValue,
      },
    })
      .then(({ data }: { data: PlaceSearchRes }) => {
        console.log(data);
        setPlaceList(data.items);
      })
      .catch((e) => console.error(e));
  });

  const selectedValue = useCreate((s) => s.company?.roadAddress);
  const selectCompany = useCreate((s) => s.selectCompany);

  const valueChangeHandler = (value: string) => {
    const place = placeList.find((v) => v.roadAddress === value);
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
          {placeList.map((place, i) => (
            <SearchItem key={i} place={place} />
          ))}
        </RadioGroup>
      </div>
    </>
  );
}

function SearchItem({ place }: { place: Place }) {
  return (
    <div className='mx-container flex items-center justify-between border-b border-al-border py-container'>
      <Label htmlFor={place.roadAddress} className='w-full'>
        <div className='text-base font-bold' dangerouslySetInnerHTML={{ __html: place.title }} />
        <span className='text-sm text-al-slate'>{place.address}</span>
      </Label>
      <RadioGroupItem value={place.roadAddress} id={place.roadAddress} />
    </div>
  );
}
