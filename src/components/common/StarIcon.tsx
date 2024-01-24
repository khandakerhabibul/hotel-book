import React from 'react';

function StarIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='12'
      fill='none'
      viewBox='0 0 12 12'
    >
      <path
        fill='#fff'
        fillOpacity='0.01'
        d='M11.364 4.065l-3.27-.477L6.63.624a.717.717 0 00-1.285 0L3.884 3.588l-3.27.477a.717.717 0 00-.397 1.222l2.367 2.306-.56 3.258a.716.716 0 001.039.754l2.926-1.538 2.926 1.538a.716.716 0 001.039-.754l-.56-3.258 2.367-2.306a.717.717 0 00-.397-1.222z'
      ></path>
      <mask
        id='mask0_1025_22137'
        width='12'
        height='12'
        x='0'
        y='0'
        maskUnits='userSpaceOnUse'
        style={{ maskType: 'alpha' }}
      >
        <path
          fill='#fff'
          d='M11.364 4.065l-3.27-.477L6.63.624a.717.717 0 00-1.285 0L3.884 3.588l-3.27.477a.717.717 0 00-.397 1.222l2.367 2.306-.56 3.258a.716.716 0 001.039.754l2.926-1.538 2.926 1.538a.716.716 0 001.039-.754l-.56-3.258 2.367-2.306a.717.717 0 00-.397-1.222z'
        ></path>
      </mask>
      <g mask='url(#mask0_1025_22137)'>
        <path fill='#FCCD03' d='M0 0H12V12H0z'></path>
      </g>
    </svg>
  );
}

export default StarIcon;
