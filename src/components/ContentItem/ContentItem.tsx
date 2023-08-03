import React, { FC } from 'react';
import { Roboto } from 'next/font/google';
import gleans from '../../../public/group_105.png';
import Image from 'next/image';
import styles from './ContentItem.module.scss';

const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
  style: 'normal',
});

interface Props {
  title: string;
  description: string;
  imgFlex?: boolean;
  style?: React.CSSProperties;
}

const ContentItem: FC<Props> = ({ title, description, style, imgFlex }) => {
  return (
    <div style={{ ...style }} className={styles['content-item']}>
      {imgFlex ? (
        <div className={styles['content-item__pictures']}>
          <div className="w-[90px] h-[90px] bg-red-500 rounded-l-[30px] rounded-r-[5px]"></div>
          <div className="flex flex-col gap-[5px]">
            <div className="w-[43px] h-[43px] bg-red-500 rounded-l-[5px] rounded-br-[5px] rounded-tr-[30px]"></div>
            <div className="flex flex-col gap-[5px]">
              <div className="flex gap-[5px]">
                <div className="w-[19px] h-[19px] bg-red-500 rounded-[5px]"></div>
                <div className="w-[19px] h-[19px] bg-red-500 rounded-[5px]"></div>
              </div>
              <div className="flex gap-[5px]">
                <div className="w-[19px] h-[19px] bg-red-500 rounded-[5px]"></div>
                <div className="w-[19px] h-[19px] bg-red-500 rounded-[5px]"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Image height={97} alt={'gleans'} src={gleans} />
      )}
      <h3
        className={`${styles['content-item__text']} ${styles['content-item__title']} ${roboto.className}`}>
        {title}
      </h3>
      <p
        className={`${styles['content-item__text']} ${styles['content-item__description']} ${roboto.className}`}>
        {description}
      </p>
    </div>
  );
};

export default ContentItem;
