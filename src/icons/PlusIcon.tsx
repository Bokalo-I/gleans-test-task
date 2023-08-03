import React, { SVGProps } from 'react';

const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    {...props}>
    <rect x="3" width="2" height="8" rx="1" fill="#00FF85" />
    <rect x="8" y="3" width="2" height="8" rx="1" transform="rotate(90 8 3)" fill="#00FF85" />
  </svg>
);

export default PlusIcon;
