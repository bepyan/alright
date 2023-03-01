import Image from 'next/image';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

const markerType = {
  companyMain: {
    src: `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse opacity='0.3' cx='20' cy='38' rx='4' ry='2' fill='black'/%3E%3Cpath d='M34 16.9747C34 27.019 20 37.5 20 37.5C20 37.5 6 27.019 6 16.9747C6 9.25668 12.268 3 20 3C27.732 3 34 9.25668 34 16.9747Z' fill='%23F95E5E'/%3E%3Ccircle cx='20' cy='17' r='5' fill='white'/%3E%3C/svg%3E%0A`,
    size: 40,
  },
  companySub: {
    src: `data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse opacity='0.3' cx='12' cy='22' rx='4' ry='2' fill='black'/%3E%3Cpath d='M21 8.91139C21 15.3165 12 22 12 22C12 22 3 15.3165 3 8.91139C3 3.98977 7.02944 0 12 0C16.9706 0 21 3.98977 21 8.91139Z' fill='%23F95E5E'/%3E%3C/svg%3E%0A`,
    size: 24,
  },
  parkMain: {
    src: `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse opacity='0.3' cx='20' cy='38' rx='4' ry='2' fill='black'/%3E%3Cpath d='M34 16.9747C34 27.019 20 37.5 20 37.5C20 37.5 6 27.019 6 16.9747C6 9.25668 12.268 3 20 3C27.732 3 34 9.25668 34 16.9747Z' fill='%232A72FF'/%3E%3Cpath d='M16.5 24H18.9V19.7351H20.5054C23.0838 19.7351 25.127 18.5189 25.127 15.7784C25.127 12.9243 23.0838 12 20.4405 12H16.5V24ZM18.9 17.8378V13.9135H20.2622C21.9162 13.9135 22.7919 14.3676 22.7919 15.7784C22.7919 17.1405 21.9973 17.8378 20.3432 17.8378H18.9Z' fill='white'/%3E%3C/svg%3E%0A`,
    size: 40,
  },
  parkSub: {
    src: `data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='11.25' fill='%2363C7F1' stroke='white' stroke-width='1.5'/%3E%3Cpath d='M9 17.36H11.072V13.678H12.458C14.684 13.678 16.448 12.628 16.448 10.262C16.448 7.798 14.684 7 12.402 7H9V17.36ZM11.072 12.04V8.652H12.248C13.676 8.652 14.432 9.044 14.432 10.262C14.432 11.438 13.746 12.04 12.318 12.04H11.072Z' fill='white'/%3E%3C/svg%3E%0A`,
    size: 24,
  },
  parkSubSelected: {
    src: `data:image/svg+xml,%3Csvg width='24' height='32' viewBox='0 0 24 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse opacity='0.3' cx='12' cy='30' rx='4' ry='2' fill='black'/%3E%3Cpath d='M24 12.1519C24 20.8861 12 30 12 30C12 30 0 20.8861 0 12.1519C0 5.44059 5.37258 0 12 0C18.6274 0 24 5.44059 24 12.1519Z' fill='%230C79FE'/%3E%3Cpath d='M16.4784 9.73608L10.8215 15.3929L7.0503 11.6217' stroke='white' stroke-width='2'/%3E%3C/svg%3E%0A`,
    size: 24,
  },
};

export interface MapMarkerProps {
  type: keyof typeof markerType;
  text: string;
  position: {
    lat: number;
    lng: number;
  };
}

export default function MapMarker({ type, text, position }: MapMarkerProps) {
  const { src, size } = markerType[type];

  return (
    <CustomOverlayMap position={position}>
      <Image src={src} alt='marker' className='mx-auto' width={size} height={size} />
      <div className='relative w-20 text-xs font-bold text-shadow-border'>
        <div className='absolute top-1 w-full whitespace-normal break-keep text-center'>{text}</div>
      </div>
    </CustomOverlayMap>
  );
}
