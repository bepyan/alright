import axios from 'axios';

import useDebouncedSearch from '~/lib/useDebouncedSearch';
import { KPlace, KPlaceSearchRes } from '~/types';
import Input from '~/ui/Input';
import Label from '~/ui/Label';
import { RadioGroup, RadioGroupItem } from '~/ui/RadioGroup';
import StepNav from '~/ui/StepNav';

import { useCreate } from './state';

export default function Step1() {
  const { data, isFetching, searchHandler } = useDebouncedSearch<KPlace[]>(
    'searchCompany',
    async (query) => {
      const res = await axios<KPlaceSearchRes>({
        url: '/api/search/keyword',
        method: 'GET',
        params: { query },
      });
      return res.data.documents;
    },
  );

  const selectedCompany = useCreate((s) => s.company);

  const valueChangeHandler = useCreate((s) => (value: string) => {
    const place = data?.find((v) => v.id === value);
    s.selectCompany(place);
  });

  return (
    <>
      <div className='space-y-3 p-container pt-3'>
        <StepNav currentStep={1} />
        <h2 className='text-xl font-bold'>업체 주소를 선택해주세요.</h2>
        <Input placeholder='업체 이름 검색' onChange={searchHandler} />
      </div>
      <div className='border-t border-al-border'>
        <RadioGroup value={selectedCompany?.id} onValueChange={valueChangeHandler}>
          {isFetching && <div className='spinner mx-auto mt-8' />}
          {!!data && !data.length && (
            <div className='pt-12 text-center text-al-disabled'>검색 결과가 없습니다.</div>
          )}
          {!!data && !!data.length && data.map((place, i) => <RadioItem key={i} place={place} />)}
          {!data && selectedCompany && <RadioItem place={selectedCompany} />}
        </RadioGroup>
      </div>
    </>
  );
}

function RadioItem({ place }: { place: KPlace }) {
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
