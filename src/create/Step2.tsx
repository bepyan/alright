import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { create } from 'zustand';

import BackButton from '~/ui/BackButton';
import Button from '~/ui/Button';
import { Icons } from '~/ui/Icons';
import IconTitle from '~/ui/IconTitle';
import { InputFrame } from '~/ui/Input';
import StepNav from '~/ui/StepNav';

import { useCreate } from './state';

const useCarParkDetail = create<{
  show: boolean;
  showCarParkDetail: () => void;
  hideCarParkDetail: () => void;
}>((set) => ({
  show: false,
  showCarParkDetail: () => {
    document.body.style.overflow = 'hidden';
    set((state) => ({ ...state, show: true }));
  },
  hideCarParkDetail: () => {
    document.body.style.overflow = '';
    set((state) => ({ ...state, show: false }));
  },
}));

const useCarParkSearch = create<{
  show: boolean;
  showCarParkSearch: () => void;
  hideCarParkSearch: () => void;
}>((set) => ({
  show: false,
  showCarParkSearch: () => {
    document.body.style.overflow = 'hidden';
    set((state) => ({ ...state, show: true }));
  },
  hideCarParkSearch: () => {
    document.body.style.overflow = '';
    set((state) => ({ ...state, show: false }));
  },
}));

export default function Step2() {
  const company = useCreate((s) => s.company);
  const companyPosition = { lng: Number(company!.x), lat: Number(company!.y) };
  const showDetail = useCarParkDetail((s) => s.show);
  const showCarParkDetail = useCarParkDetail((s) => s.showCarParkDetail);

  const showSearch = useCarParkSearch((s) => s.show);
  const showCarParkSearch = useCarParkSearch((s) => s.showCarParkSearch);

  if (!company) {
    return null;
  }

  return (
    <>
      <div className='space-y-3 p-container pt-3'>
        <StepNav currentStep={2} />
        <h2 className='text-xl font-bold'>계약한 주차장을 모두 추가해주세요.</h2>
        <InputFrame placeholder='계약한 주차장 검색' onClick={showCarParkSearch} />
      </div>

      <Map center={companyPosition} className='h-52 w-full bg-blue-50'>
        <MapMarker
          position={companyPosition}
          image={{
            src: `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse opacity='0.3' cx='20' cy='38' rx='4' ry='2' fill='black'/%3E%3Cpath d='M34 16.9747C34 27.019 20 37.5 20 37.5C20 37.5 6 27.019 6 16.9747C6 9.25668 12.268 3 20 3C27.732 3 34 9.25668 34 16.9747Z' fill='%23F95E5E'/%3E%3Ccircle cx='20' cy='17' r='5' fill='white'/%3E%3C/svg%3E%0A`,
            size: {
              width: 40,
              height: 40,
            },
          }}
        />
        <CustomOverlayMap position={companyPosition}>
          <div className='mt-4 text-xs font-bold text-shadow-border'>{company.place_name}</div>
        </CustomOverlayMap>
      </Map>

      <div className='p-container'>
        <IconTitle icon='Check' text='추가한 주차장' className='text-al-blue' />
        <div className='mt-container rounded-xl border border-al-blue'>
          <SearchItem onClick={showCarParkDetail} />
        </div>
      </div>

      <div className='p-container'>
        <IconTitle icon='Check' text='근처 주차장' />
        <div className='mt-container rounded-xl border border-al-border'>
          <SearchItem onClick={showCarParkDetail} />
        </div>
      </div>

      {showDetail && <CarParkDetail />}
      {showSearch && <CarParkSearch />}
    </>
  );
}

function SearchItem({ onClick }: { onClick: () => void }) {
  return (
    <div className='flex items-center justify-between p-container pr-3' onClick={onClick}>
      <div>
        <p className='font-bold'>오라이 주차장</p>
        <p className='mt-1 text-sm text-al-slate'>서울 송파구 마청동 215-0</p>
      </div>
      <Icons.ChevronRight className='h-5 w-5 text-al-disabled' />
    </div>
  );
}

function CarParkDetail() {
  const hideCarParkDetail = useCarParkDetail((s) => s.hideCarParkDetail);

  return (
    <div className='container fixed inset-0 z-50 overflow-y-scroll bg-white'>
      <div className='container fixed mt-1.5 ml-3.5'>
        <div className=''>
          <BackButton
            className='flex h-9 w-9 items-center justify-center rounded-full bg-white'
            onClick={hideCarParkDetail}
          />
        </div>
      </div>

      <div className='h-48 bg-blue-50' />

      <div className='p-container'>
        <h2 className='text-xl font-bold'>오리이 주차장</h2>
        <p className='mt-1 text-sm text-al-slate'>서울 송파구 마천동 215-0</p>
      </div>

      <div className='h-2 bg-al-gray-100' />

      <div className='p-container'>
        <IconTitle icon='Money' text='요금정보' />
      </div>

      <div className='mx-container border-y border-al-border py-container'>
        <IconTitle icon='Schedule' text='운영정보' />
      </div>

      <div className='p-container'>
        <IconTitle icon='Description' text='기타정보' />
      </div>

      <div className='flex gap-1 px-container'>
        <Button className='flex-1'>추가하기</Button>
        {/* <Button className='flex-1' variant='outline'>
          수정
        </Button>
        <Button className='flex-1' variant='destructive'>
          삭제
        </Button> */}
      </div>
    </div>
  );
}

function CarParkSearch() {
  const hideCarParkSearch = useCarParkSearch((s) => s.hideCarParkSearch);
  const showCarParkDetail = useCarParkDetail((s) => s.showCarParkDetail);

  const handleClickSearchItem = () => {
    hideCarParkSearch();
    showCarParkDetail();
  };

  return (
    <div className='container fixed inset-0 z-40 bg-white'>
      <div className='sticky top-0 flex h-12 items-center gap-3 border-b border-al-border px-container'>
        <BackButton onClick={hideCarParkSearch} />
        <input placeholder='계약한 주차장 검색' className='flex-1 focus:outline-none' autoFocus />
      </div>

      <div>
        <div
          className='mx-container flex items-center justify-between border-b border-al-border py-container'
          onClick={handleClickSearchItem}
        >
          <div>
            <p className='text-base font-bold'>(주) 오라이 좋아 2</p>
            <span className='text-sm text-al-slate'>서울 송파구 마천동 215-0</span>
          </div>
          <Icons.ChevronRight className='h-5 w-5 text-al-disabled' />
        </div>
      </div>
    </div>
  );
}
