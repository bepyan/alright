import { ParkingLotInfo } from '~/models/alright';

import { useCarParkDetail } from './state';

export interface CarParkListItemProps {
  item: ParkingLotInfo;
}

export default function CarParkListItem({ item }: CarParkListItemProps) {
  const showCarParkDetail = useCarParkDetail((s) => s.showCarParkDetail);

  const clickHandler = () => {
    showCarParkDetail(item);
  };

  return (
    <div className='flex items-center justify-between p-container'>
      <div className='space:mt-1'>
        <div className='inline-flex h-6 items-center rounded bg-al-green px-1.5 text-xs font-bold text-white'>
          무료/할인
        </div>
        <div className='font-bold'>{item.place_name}</div>
        <div className='text-sm text-al-slate'>{item.address_name}</div>
        <div className='flex items-center text-sm'>
          <span className='font-bold text-al-blue'>{26}대 여유</span>
          <span className='mx-1.5 mt-0.5 h-3 w-[1px] bg-[#C7CFD9]' />
          <span className='text-al-slate'>{100}대 전체</span>
        </div>
      </div>
      <button
        className='flex h-8 w-8 items-center justify-center rounded-full bg-al-blue text-white'
        onClick={clickHandler}
      >
        <svg
          width='12'
          height='12'
          viewBox='0 0 12 12'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M6.00048 0.450181L11.5508 6.00048L6.00048 11.5508L4.68828 10.2566L8.02548 6.91938L0.450182 6.91938L0.450183 5.08158L8.02548 5.08158L4.68828 1.74438L6.00048 0.450181Z'
            fill='white'
          />
        </svg>
      </button>
    </div>
  );
}
