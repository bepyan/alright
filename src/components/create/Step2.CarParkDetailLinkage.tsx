import { Label } from '@radix-ui/react-label';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

import { SeoulParkingPlace } from '~/types';
import Button from '~/ui/Button';
import IconTitle from '~/ui/IconTitle';
import { RadioGroup, RadioGroupItem } from '~/ui/RadioGroup';

import { useCarParkDetail } from './Step2.state';

export default function CarParkDetailLinkage() {
  const targetPlace = useCarParkDetail((s) => s.targetPlace)!;
  const seoulParkingPlace = useCarParkDetail((s) => s.seoulParkingPlace);
  const isPassLinked = useCarParkDetail((s) => s.isPassLinked);

  const { isLoading, data } = useQuery(['carParkDetail', targetPlace.id], () =>
    axios<SeoulParkingPlace[]>('/api/search/public-parking-lot', {
      params: { search: targetPlace.address_name.replace(/[0-9]|-|서울/g, '').trim() },
    }).then((res) => res.data),
  );

  const [selectSeoulParkingPlace, setSeoulParkingPlace] = useState<SeoulParkingPlace>();

  const valueChangeHandler = (value: string) => {
    const place = data?.find((v) => String(v.parking_code) === value);
    setSeoulParkingPlace(place);
  };

  const editPassLinked = useCarParkDetail((s) => s.editPassLinked);
  const handlePassLinked = () => editPassLinked(true);

  const editSeoulParkingPlace = useCarParkDetail((s) => s.editSeoulParkingPlace);
  const handleLinkSeoulParkingPlace = () =>
    selectSeoulParkingPlace && editSeoulParkingPlace(selectSeoulParkingPlace);

  const relinkSeoulParkingPlace = useCarParkDetail((s) => s.relinkSeoulParkingPlace);

  return (
    <div className='p-container pb-0'>
      <IconTitle icon='Description' text='공영주차장 데이터 연동' />
      <span className='mt-1 text-xs text-al-slate'>
        * 잘못 지정하게 될 경우 고객에게 혼란을 줄 수 있습니다.
      </span>

      {isLoading && <div className='spinner mx-auto mt-8' />}

      {!isLoading && data && (
        <>
          {!isPassLinked && !data.length && (
            <div className='mt-1 text-xs text-al-slate'>* 검색된 주차장이 없습니다.</div>
          )}
          {!isPassLinked && !!data.length && (
            <RadioGroup
              value={String(
                targetPlace.parkingCode ??
                  seoulParkingPlace?.parking_code ??
                  selectSeoulParkingPlace?.parking_code,
              )}
              onValueChange={valueChangeHandler}
            >
              {data
                .filter((item) => {
                  if (targetPlace.parkingCode) {
                    return targetPlace.parkingCode === item.parking_code;
                  }

                  if (seoulParkingPlace) {
                    return seoulParkingPlace.parking_code === item.parking_code;
                  }

                  if (isPassLinked !== undefined) {
                    return isPassLinked;
                  }

                  return true;
                })
                .map((item, i) => (
                  <div
                    key={i}
                    className='flex items-center justify-between border-b border-al-border py-container'
                  >
                    <Label htmlFor={String(item.parking_code)} className='w-full'>
                      <div className='text-base font-bold'>{item.parking_name}</div>
                      <span className='text-sm text-al-slate'>{item.addr}</span>
                    </Label>
                    <RadioGroupItem
                      value={String(item.parking_code)}
                      id={String(item.parking_code)}
                    />
                  </div>
                ))}
            </RadioGroup>
          )}

          {!targetPlace.parkingCode && !isPassLinked && !seoulParkingPlace ? (
            <div className='mt-10 grid grid-cols-3 gap-1'>
              <Button className='col-span-1' variant='outline' onClick={handlePassLinked}>
                넘김
              </Button>
              <Button
                disabled={!selectSeoulParkingPlace}
                className='col-span-2'
                variant='default'
                onClick={handleLinkSeoulParkingPlace}
              >
                연동
              </Button>
            </div>
          ) : (
            <div className='mt-2 flex'>
              <Button
                className='flex-1'
                size='sm'
                variant='outline'
                onClick={relinkSeoulParkingPlace}
              >
                {isPassLinked ? '연동하기' : '재연동'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
