import { Input, Select } from 'antd';

import { renderMinute } from '~/lib/date';
import Button from '~/ui/Button';
import IconTitle from '~/ui/IconTitle';
import RangePicker from '~/ui/RangePicker';
import TextArea from '~/ui/TextArea';

import { useCreate } from './state';
import { useCarParkDetail } from './Step2.state';

export default function CarParkDetailEdit() {
  return (
    <div>
      <MoneyField />
      <div className='mx-container h-[1px] bg-al-border' />
      <TimeField />
      <div className='mx-container h-[1px] bg-al-border' />
      <DescriptionField />
      <EditFooter />
    </div>
  );
}

function MoneyField() {
  const targetPlace = useCarParkDetail((s) => s.targetPlace)!;

  const editTargetPlace = useCarParkDetail((s) => s.editTargetPlace);

  return (
    <div className='p-container space:mt-2'>
      <IconTitle icon='Money' text='요금정보' />
      <div className='flex items-center justify-between'>
        <span className='text-sm'>무료 할인(시간)</span>
        <Select
          style={{ width: 168 }}
          value={targetPlace.freeTimeDiscount}
          onSelect={(value) => editTargetPlace({ freeTimeDiscount: value })}
          options={[
            {
              value: '',
              label: '없음',
            },
            ...[...new Array(24 * 2)]
              .map((_, i) => (i + 1) * 30)
              .map((minute) => ({
                value: String(minute),
                label: renderMinute(minute),
              })),
          ]}
        />
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-sm'>기본 요금(시간)</span>
        <div className='flex items-center gap-2'>
          <Input
            className='w-20'
            inputMode='numeric'
            value={targetPlace.defaultFeeTime}
            onChange={(e) => editTargetPlace({ defaultFeeTime: e.target.value })}
            suffix='분'
          />
          <Input
            className='w-20'
            inputMode='numeric'
            value={targetPlace.defaultFeeAmount}
            onChange={(e) => editTargetPlace({ defaultFeeAmount: e.target.value })}
            suffix='원'
          />
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-sm'>추가 요금(시간)</span>
        <div className='flex items-center gap-2'>
          <Input
            className='w-20'
            inputMode='numeric'
            value={targetPlace.additionFeeTime}
            onChange={(e) => editTargetPlace({ additionFeeTime: e.target.value })}
            suffix='분'
          />
          <Input
            className='w-20'
            inputMode='numeric'
            value={targetPlace.additionFeeAmount}
            onChange={(e) => editTargetPlace({ additionFeeAmount: e.target.value })}
            suffix='원'
          />
        </div>
      </div>
    </div>
  );
}

function TimeField() {
  const weekdaysTime = useCarParkDetail((s) => s.computed.weekdaysTime);
  const satTime = useCarParkDetail((s) => s.computed.satTime);
  const sunTime = useCarParkDetail((s) => s.computed.sunTime);

  const editTargetPlace = useCarParkDetail((s) => s.editTargetPlace);

  return (
    <div className='p-container space:mt-2'>
      <IconTitle icon='Schedule' text='운영정보' />
      <div className='flex items-center justify-between'>
        <span className='text-sm'>평일</span>
        <RangePicker
          defaultValue={weekdaysTime}
          onChange={(v) =>
            editTargetPlace({
              weekdaysStartTime: v?.[0]?.format('HH:mm'),
              weekdaysEndTime: v?.[1]?.format('HH:mm'),
            })
          }
        />
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-sm'>토요일</span>
        <RangePicker
          defaultValue={satTime}
          onChange={(v) =>
            editTargetPlace({
              satStartTime: v?.[0]?.format('HH:mm'),
              satEndTime: v?.[1]?.format('HH:mm'),
            })
          }
        />
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-sm'>일요일</span>
        <RangePicker
          defaultValue={sunTime}
          onChange={(v) =>
            editTargetPlace({
              sunStartTime: v?.[0]?.format('HH:mm'),
              sunEndTime: v?.[1]?.format('HH:mm'),
            })
          }
        />
      </div>
    </div>
  );
}

function DescriptionField() {
  const carPark = useCarParkDetail((s) => s.targetPlace)!;
  const editTargetPlace = useCarParkDetail((s) => s.editTargetPlace);

  return (
    <div className='p-container'>
      <IconTitle icon='Description' text='기타정보' />
      <TextArea
        className='mt-4'
        placeholder='고객님께 주차 꿀팁을 공유해주세요.'
        value={carPark.otherInfo}
        onChange={(e) => editTargetPlace({ otherInfo: e.target.value })}
      />
    </div>
  );
}

function EditFooter() {
  const targetPlace = useCarParkDetail((s) => s.targetPlace)!;

  const selectedCarParkList = useCreate((s) => s.selectedCarParkList);
  const selectedCarPark = selectedCarParkList.find((v) => v.id === targetPlace.id);

  const isSelected = !!selectedCarPark;
  const isEdited = isSelected && JSON.stringify(selectedCarPark) !== JSON.stringify(targetPlace);

  const hideCarParkDetail = useCarParkDetail((s) => s.hideCarParkDetail);

  const selectCarPark = useCreate((s) => () => {
    s.selectCarPark({ ...targetPlace });
    hideCarParkDetail();
  });

  const updateCarPark = useCreate((s) => () => {
    s.updateCarPark(targetPlace);
    hideCarParkDetail();
  });

  const removeCarPark = useCreate((s) => () => {
    s.removeCarPark(targetPlace);
    hideCarParkDetail();
  });

  return (
    <div className='flex gap-1 px-container'>
      {isSelected ? (
        <>
          <Button className='flex-1' variant='outline' disabled={!isEdited} onClick={updateCarPark}>
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
  );
}
