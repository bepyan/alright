import { Select } from 'antd';
import { Map } from 'react-kakao-maps-sdk';

import { renderMinute } from '~/lib/date';
import { transferPosition } from '~/lib/utils';
import { type CarParkDetail } from '~/types';
import BackButton from '~/ui/BackButton';
import Button from '~/ui/Button';
import IconTitle from '~/ui/IconTitle';
import MapMarker from '~/ui/MapMarker';
import RangePicker from '~/ui/RangePicker';
import TextArea from '~/ui/TextArea';

import { useCreate } from './state';
import { useCarParkDetail } from './Step2.state';

export default function CarParkDetail() {
  const carPark = useCarParkDetail((s) => s.targetPlace)!;
  const carParkPosition = transferPosition(carPark);
  const hideCarParkDetail = useCarParkDetail((s) => s.hideCarParkDetail);
  const editCarPark = useCarParkDetail((s) => s.editCarPark);

  const company = useCreate((s) => s.company)!;
  const companyPosition = transferPosition(company);

  const selectedCarParkList = useCreate((s) => s.selectedCarParkList);
  const selectedCarPark = selectedCarParkList.find((v) => v.id === carPark.id);
  const isSelected = !!selectedCarPark;
  const isEdited = isSelected && JSON.stringify(selectedCarPark) !== JSON.stringify(carPark);

  const selectCarPark = useCreate((s) => () => {
    s.selectCarPark(carPark);
    hideCarParkDetail();
  });

  const removeCarPark = useCreate((s) => () => {
    s.removeCarPark(carPark);
    hideCarParkDetail();
  });

  return (
    <div className='container fixed inset-0 z-50 overflow-y-scroll bg-white pb-12'>
      <div className='container fixed z-50 mt-1.5 ml-3.5'>
        <div className=''>
          <BackButton
            className='flex h-9 w-9 items-center justify-center rounded-full bg-white'
            onClick={hideCarParkDetail}
          />
        </div>
      </div>

      <Map center={carParkPosition} className='h-48 w-full'>
        <MapMarker type='parkMain' position={carParkPosition} text={carPark.place_name} />
        <MapMarker type='companySub' position={companyPosition} text={company.place_name} />
      </Map>

      <div className='p-container'>
        <h2 className='text-xl font-bold'>{carPark.place_name}</h2>
        <p className='mt-1 text-sm text-al-slate'>{carPark.address_name}</p>
      </div>

      <div className='h-2 bg-al-gray-100' />

      <div className='p-container space:mt-2'>
        <IconTitle icon='Money' text='요금정보' />
        <div className='flex items-center justify-between'>
          <span className='text-sm'>무료 할인(시간)</span>
          <Select
            style={{ width: 168 }}
            value={carPark.freeTimeDiscount}
            onSelect={(value) => editCarPark({ freeTimeDiscount: value })}
            options={[
              {
                value: '',
                label: '없음',
              },
              ...[15, 30, 45, 60, 90, 120, 150, 180].map((minute) => ({
                value: String(minute),
                label: renderMinute(minute),
              })),
            ]}
          />
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>기본 요금(시간)</span>
          <div className='flex items-center gap-2'>
            <Select
              style={{ width: 80 }}
              value={carPark.defaultFeeTime}
              onSelect={(value) => editCarPark({ defaultFeeTime: value })}
              options={[
                {
                  value: '',
                  label: '없음',
                },
                ...[5, 10, 15, 20, 30, 45, 60].map((minute) => ({
                  value: String(minute),
                  label: renderMinute(minute),
                })),
              ]}
            />
            <Select
              style={{ width: 80 }}
              value={carPark.defaultFeeAmount}
              onSelect={(value) => editCarPark({ defaultFeeAmount: value })}
              options={[
                { value: '50', label: '50원' },
                { value: '100', label: '100원' },
                { value: '200', label: '200원' },
              ]}
            />
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>추가 요금(시간)</span>
          <div className='flex items-center gap-2'>
            <Select
              style={{ width: 80 }}
              value={carPark.additionFeeTime}
              onSelect={(value) => editCarPark({ additionFeeTime: value })}
              options={[
                {
                  value: '',
                  label: '없음',
                },
                ...[5, 10, 15, 20, 30, 45, 60].map((minute) => ({
                  value: String(minute),
                  label: renderMinute(minute),
                })),
              ]}
            />
            <Select
              style={{ width: 80 }}
              value={carPark.additionFeeAmount}
              onSelect={(value) => editCarPark({ additionFeeAmount: value })}
              options={[
                { value: '50', label: '50원' },
                { value: '100', label: '100원' },
                { value: '200', label: '200원' },
              ]}
            />
          </div>
        </div>
      </div>

      <div className='mx-container border-y border-al-border py-container space:mt-2'>
        <IconTitle icon='Schedule' text='운영정보' />
        <div className='flex items-center justify-between'>
          <span className='text-sm'>평일</span>
          <RangePicker
            onChange={(v) =>
              editCarPark({
                weekdaysStartTime: v?.[0]?.format('HH:mm'),
                weekdaysEndTime: v?.[1]?.format('HH:mm'),
              })
            }
          />
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>토요일</span>
          <RangePicker
            onChange={(v) =>
              editCarPark({
                weekdaysStartTime: v?.[0]?.format('HH:mm'),
                weekdaysEndTime: v?.[1]?.format('HH:mm'),
              })
            }
          />
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>일요일</span>
          <RangePicker
            onChange={(v) =>
              editCarPark({
                weekdaysStartTime: v?.[0]?.format('HH:mm'),
                weekdaysEndTime: v?.[1]?.format('HH:mm'),
              })
            }
          />
        </div>
      </div>

      <div className='p-container'>
        <IconTitle icon='Description' text='기타정보' />
        <TextArea
          className='mt-4'
          placeholder='고객님께 주차 꿀팁을 공유해주세요.'
          onChange={(e) => editCarPark({ otherInfo: e.target.value })}
        />
      </div>

      <div className='flex gap-1 px-container'>
        {isSelected ? (
          <>
            <Button className='flex-1' variant='outline' disabled={!isEdited}>
              수정
            </Button>
            <Button className='flex-1' variant='destructive' onClick={removeCarPark}>
              삭제
            </Button>
          </>
        ) : (
          <Button className='flex-1' onClick={selectCarPark}>
            추가하기
          </Button>
        )}
      </div>
    </div>
  );
}
