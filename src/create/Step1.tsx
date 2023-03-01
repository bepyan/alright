import axios from 'axios';
import { useState } from 'react';

import useSearch from '~/lib/useSearch';
import { Place, PlaceSearchRes } from '~/types/place';
import Input from '~/ui/Input';
import Label from '~/ui/Label';
import { RadioGroup, RadioGroupItem } from '~/ui/RadioGroup';
import StepNav from '~/ui/StepNav';

import { useCreate } from './state';

const dummyPlace = {
  address_name: '서울 용산구 한강로2가 98-3',
  category_group_code: 'FD6',
  category_group_name: '음식점',
  category_name: '음식점 > 술집 > 와인바',
  distance: '',
  id: '19950533191234',
  phone: '',
  place_name: '오라이샴팡',
  place_url: 'http://place.map.kakao.com/1995053319',
  road_address_name: '서울 용산구 한강대로46길 15',
  x: '126.971150136434',
  y: '37.5312061331283',
};

export default function Step1() {
  const [placeList, setPlaceList] = useState<Place[]>([dummyPlace]);

  const { searchHandler } = useSearch((searchValue) => {
    if (!searchValue) return;

    axios('/api/search', {
      params: {
        query: searchValue,
      },
    })
      .then(({ data }: { data: PlaceSearchRes }) => {
        console.log(data);
        setPlaceList(data.documents);
      })
      .catch((e) => console.error(e));
  });

  const selectedValue = useCreate((s) => s.company?.id);
  const selectCompany = useCreate((s) => s.selectCompany);

  const valueChangeHandler = (value: string) => {
    const place = placeList.find((v) => v.id === value);
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
      <Label htmlFor={place.id} className='w-full'>
        <div className='text-base font-bold'>{place.place_name}</div>
        <span className='text-sm text-al-slate'>{place.address_name}</span>
      </Label>
      <RadioGroupItem value={place.id} id={place.id} />
    </div>
  );
}
