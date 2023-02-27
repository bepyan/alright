import React from 'react';

const Pictures = {
  CarPark: (props: React.ButtonHTMLAttributes<SVGElement>) => {
    return (
      <svg
        width='208'
        height='208'
        viewBox='0 0 208 208'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        <circle cx='104' cy='104' r='104' fill='#F5F6F8' />
        <mask
          id='mask0_361_4755'
          style={{ maskType: 'alpha' }}
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='208'
          height='208'
        >
          <circle cx='104' cy='104' r='104' fill='#F5F6F8' />
        </mask>
        <g mask='url(#mask0_361_4755)'>
          <rect x='13' y='156' width='184' height='57' fill='#B2CBE9' />
        </g>
        <rect x='89' y='46' width='66' height='110' fill='#E2E6EC' />
        <rect x='99' y='56' width='46' height='8' fill='#D1D8E1' />
        <rect x='99' y='72' width='46' height='8' fill='#D1D8E1' />
        <rect x='99' y='88' width='46' height='8' fill='#D1D8E1' />
        <rect x='99' y='104' width='46' height='8' fill='#D1D8E1' />
        <rect x='99' y='120' width='46' height='8' fill='#D1D8E1' />
        <rect x='70' y='109' width='8' height='47' fill='#0C79FE' />
        <rect x='53' y='83' width='42' height='42' rx='8' fill='#0C79FE' />
        <path
          d='M69.002 113H72.258V107.214H74.436C77.934 107.214 80.706 105.564 80.706 101.846C80.706 97.974 77.934 96.72 74.348 96.72H69.002V113ZM72.258 104.64V99.316H74.106C76.35 99.316 77.538 99.932 77.538 101.846C77.538 103.694 76.46 104.64 74.216 104.64H72.258Z'
          fill='white'
        />
      </svg>
    );
  },
};

export type PicturesType = keyof typeof Pictures;

export default Pictures;
