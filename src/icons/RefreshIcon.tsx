import * as React from 'react';
import { SVGProps } from 'react';

const RefreshIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px" {...props}>
    <path d="M15 3a11.967 11.967 0 0 0-7.793 2.875 1 1 0 1 0 1.299 1.52A9.948 9.948 0 0 1 15 5a9.986 9.986 0 0 1 9.951 9H22l4 6 4-6h-3.05C26.437 7.852 21.277 3 15 3zM4 10l-4 6h3.05C3.563 22.148 8.723 27 15 27c2.969 0 5.697-1.083 7.793-2.875a1 1 0 1 0-1.299-1.52A9.948 9.948 0 0 1 15 25a9.986 9.986 0 0 1-9.951-9H8l-4-6z" />
  </svg>
);
export default RefreshIcon;
