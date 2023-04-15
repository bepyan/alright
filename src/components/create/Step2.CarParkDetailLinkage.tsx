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
  const isPassLinked = useCarParkDetail((s) => s.isPassLinked);

  const { isLoading, data } = useQuery(['carParkDetail', targetPlace.id], () =>
    axios<SeoulParkingPlace[]>('/api/search/public-parking-lot', {
      params: { search: targetPlace.address_name.replace(/[0-9]|-|서울/g, '').trim() },
    }).then((res) => res.data),
  );

  const [selectedSeoulParkingPlace, setSelectedSeoulParkingPlace] = useState<SeoulParkingPlace>();

  const valueChangeHandler = (value: string) => {
    const place = data?.find((v) => String(v.parking_code) === value);
    setSelectedSeoulParkingPlace(place);
  };

  return (
    <div className='p-container pb-0'>
      <IconTitle icon='CarPark' text='공영주차장 데이터 연동' />
      <span className='mt-1 text-xs text-al-slate'>
        * 잘못 지정하게 될 경우 고객에게 혼란을 줄 수 있습니다.
      </span>

      {isLoading && <div className='spinner mx-auto mt-8' />}

      {!isPassLinked && !isLoading && data && !data.length && (
        <div className='mt-1 text-xs text-al-slate'>* 검색된 주차장이 없습니다.</div>
      )}

      {!isPassLinked && !isLoading && data && !!data.length && (
        <SelectContent
          parkingLotList={data}
          value={String(targetPlace.parkingCode ?? selectedSeoulParkingPlace?.parking_code)}
          valueChangeHandler={valueChangeHandler}
        />
      )}

      <Footer selectedSeoulParkingPlace={selectedSeoulParkingPlace} />
    </div>
  );
}

function SelectContent({
  parkingLotList,
  value,
  valueChangeHandler,
}: {
  parkingLotList: SeoulParkingPlace[];
  value: string;
  valueChangeHandler: (value: string) => void;
}) {
  const targetPlace = useCarParkDetail((s) => s.targetPlace)!;
  const isPassLinked = useCarParkDetail((s) => s.isPassLinked);

  return (
    <RadioGroup value={value} onValueChange={valueChangeHandler}>
      {parkingLotList
        .filter((item) => {
          if (targetPlace.parkingCode) {
            return targetPlace.parkingCode === item.parking_code;
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
            <RadioGroupItem value={String(item.parking_code)} id={String(item.parking_code)} />
          </div>
        ))}
    </RadioGroup>
  );
}

function Footer({ selectedSeoulParkingPlace }: { selectedSeoulParkingPlace?: SeoulParkingPlace }) {
  const targetPlace = useCarParkDetail((s) => s.targetPlace)!;
  const isPassLinked = useCarParkDetail((s) => s.isPassLinked);

  const handlePassLinked = useCarParkDetail((s) => () => s.editPassLinked(true));
  const handleLinkSeoulParkingPlace = useCarParkDetail((s) => () => {
    if (!selectedSeoulParkingPlace) {
      return;
    }

    s.editTargetPlace({
      parkingCode: selectedSeoulParkingPlace.parking_code,
      phone: selectedSeoulParkingPlace.tel,
      defaultFeeTime: String(selectedSeoulParkingPlace.time_rate),
      defaultFeeAmount: String(selectedSeoulParkingPlace.rates),
      additionFeeTime: String(selectedSeoulParkingPlace.add_time_rate),
      additionFeeAmount: String(selectedSeoulParkingPlace.add_rates),
      weekdaysStartTime: selectedSeoulParkingPlace.weekday_begin_time,
      weekdaysEndTime: selectedSeoulParkingPlace.weekday_end_time,
      weekendStartTime: selectedSeoulParkingPlace.weekend_begin_time,
      weekendEndTime: selectedSeoulParkingPlace.weekend_end_time,
      holidayStartTime: selectedSeoulParkingPlace.holiday_begin_time,
      holidayEndTime: selectedSeoulParkingPlace.holiday_end_time,
    });
  });
  const relinkSeoulParkingPlace = useCarParkDetail((s) => s.relinkSeoulParkingPlace);

  if (!targetPlace.parkingCode && !isPassLinked) {
    return (
      <div className='mt-10 grid grid-cols-3 gap-1'>
        <Button className='col-span-1' variant='outline' onClick={handlePassLinked}>
          넘김
        </Button>
        <Button
          disabled={!selectedSeoulParkingPlace}
          className='col-span-2'
          variant='default'
          onClick={handleLinkSeoulParkingPlace}
        >
          연동
        </Button>
      </div>
    );
  }

  return (
    <div className='mt-2 flex'>
      <Button className='flex-1' size='sm' variant='outline' onClick={relinkSeoulParkingPlace}>
        {isPassLinked ? '연동하기' : '재연동'}
      </Button>
    </div>
  );
}
