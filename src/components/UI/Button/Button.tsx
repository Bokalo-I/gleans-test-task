import React, { FC, useEffect, useState } from 'react';
import styles from './Button.module.scss';
import { Roboto } from 'next/font/google';
import RefreshIcon from '../../../icons/RefreshIcon';
import CheckIcon from '@/icons/CheckIcon';

const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
  style: 'normal',
});

interface Props {
  text: string;
  size?: 'small' | 'large';
  color?: 'success' | 'normal';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: React.CSSProperties;
  loadingAnimation?: boolean;
  submitFn?: () => void;
}

const Button: FC<Props> = ({
  text,
  size,
  color = 'normal',
  onClick,
  className = '',
  style,
  loadingAnimation,
  submitFn,
}) => {
  const [isDone, setIsDone] = useState<boolean>(false);

  const sizeStyle = size === 'large' ? styles.button_large : '';
  const colorStyle = color === 'success' ? styles.button_success : '';
  const animationStyle = loadingAnimation ? 'w-20 overflow-hidden h-[45.75px]' : '';
  const successStyle = isDone ? styles.button_success : '';

  useEffect(() => {
    setTimeout(() => {
      if (!loadingAnimation) {
        return;
      }
      setIsDone(true);
      submitFn &&
        setTimeout(() => {
          submitFn();
        }, 2000);
    }, 3000);
  }, [loadingAnimation]);

  return (
    <button
      onClick={onClick}
      style={style}
      disabled={isDone || loadingAnimation}
      className={`${styles.button} ${sizeStyle} ${colorStyle} ${roboto.className} ${animationStyle} ${successStyle} ${className}`}>
      {!isDone && loadingAnimation ? (
        <>
          <div className={`${styles.button__progress} ${styles.button_success}`} />
          <div className={styles.button__content}>
            <RefreshIcon width={20} height={20} className={styles.button__loader} />
          </div>
        </>
      ) : (
        <>{isDone ? <CheckIcon width={20} height={20} className={styles.button__check} /> : text}</>
      )}
    </button>
  );
};

export default Button;
