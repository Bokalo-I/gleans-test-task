import React, { FC } from 'react';
import Button from '../UI/Button/Button';
import styles from './Done.module.scss';

interface Props {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuContent: React.Dispatch<React.SetStateAction<number>>;
}

const Done: FC<Props> = ({ setIsMenuOpen, setMenuContent }) => {
  const handleButtonClick = () => {
    setIsMenuOpen(false);
    setMenuContent(0);
  };

  return (
    <div className={styles.done}>
      <Button
        text="Done"
        color="success"
        className={styles.done__button}
        onClick={handleButtonClick}
      />
    </div>
  );
};

export default Done;
