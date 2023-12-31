import * as React from 'react';
import { SVGProps } from 'react';

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px" {...props}>
    <path d="M41.938 8.625a2 2 0 0 0-1.626.938L21.5 38.343 9.312 27.814a1.992 1.992 0 0 0-2.03-.52 1.998 1.998 0 0 0-.595 3.52l13.938 12.062a2.005 2.005 0 0 0 1.582.453 2.01 2.01 0 0 0 1.387-.89L43.687 11.75a1.997 1.997 0 0 0-1.75-3.125Z" />
  </svg>
);

export default CheckIcon;
