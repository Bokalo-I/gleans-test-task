import React, { SVGProps } from 'react';

const MinusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="8"
    height="2"
    viewBox="0 0 8 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <rect x="8" width="2" height="8" rx="1" transform="rotate(90 8 0)" fill="#B9B9B9" />
  </svg>
);

export default MinusIcon;
