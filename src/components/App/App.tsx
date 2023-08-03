'use client';

import React, { useState } from 'react';
import styles from './App.module.scss';
import Image from 'next/image';
import background from '../../../public/app-background.jpeg';
import Button from '../UI/Button/Button';
import Menu from '../UI/Menu/Menu';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    if (!isMenuOpen) {
      return;
    }
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <main className={styles.app}>
      {!isMenuOpen && (
        <Button
          text="Add Content"
          size="small"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={styles.app__button}
        />
      )}
      <Image className={styles.app__background} alt="background" src={background} />
      <div
        onClick={handleMenuOpen}
        className={`${styles.app__blur} ${isMenuOpen ? styles.app__blur_active : ''}`}
      />
      <Menu open={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </main>
  );
};

export default App;
