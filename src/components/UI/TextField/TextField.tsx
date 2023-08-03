import React, { FC, useRef, useState } from 'react';
import styles from './TextField.module.scss';
import ChainIcon from '@/icons/ChainIcon';
import { Roboto } from 'next/font/google';
import Button from '../Button/Button';
import { isValidUrl } from '@/app/isValidUrl';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  style: 'normal',
});

interface Props {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  submitFn: () => void;
  loadingAnimation?: boolean;
  onSubmit?: () => void;
}

const TextField: FC<Props> = ({ setValue, value, submitFn, loadingAnimation, onSubmit }) => {
  // const [clicked, setClicked] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    ref.current?.focus();
  };

  // const toggle = async () => {
  //   setClicked((prev) => !prev);

  //   if (!isValidUrl(value)) {
  //     return setTitle(link);
  //   }

  //   const urlData = await fetch(value);
  //   console.log(urlData);
  // };

  return (
    <div className={styles['text-field']}>
      <ChainIcon
        width={20}
        height={20}
        className={styles['text-field__icon']}
        onClick={focusInput}
      />
      <div className={styles['text-field__input-container']}>
        <input
          ref={ref}
          className={`${styles['text-field__input']} ${roboto.className}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a Link, titel or collection name"
        />
        {value && <div className={styles['text-field__input-hidden']} />}
      </div>
      {value && (
        <Button
          loadingAnimation={loadingAnimation}
          text="Add"
          className={styles['text-field__button']}
          onClick={onSubmit}
          submitFn={submitFn}
        />
      )}
    </div>
  );
};

export default TextField;
