import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import styles from './Menu.module.scss';
import { Roboto } from 'next/font/google';
import ContentItem from '@/components/ContentItem/ContentItem';
import TextField from '../TextField/TextField';
import useDeviceSize from '@/hooks/useDeviceSize';
import dynamic from 'next/dynamic';
const CreateGlean = dynamic(() => import('@/components/CreateGlean/CreateGlean'), { ssr: false });
import { isValidUrl } from '@/app/isValidUrl';
import Button from '../Button/Button';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  style: 'normal',
});

interface Props {
  open: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: FC<Props> = ({ open, setIsMenuOpen }) => {
  const [link, setLink] = useState<string>('');
  const [menuContent, setMenuContent] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [clicked, setClicked] = useState<boolean>(false);
  const [, height] = useDeviceSize();
  const addContentRef = useRef<HTMLElement>(null);
  const createGleanRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const checkMenuClassName = (): CSSProperties | undefined => {
    if (!menuRef.current) {
      return;
    }
    return {
      transform: `translate(-50%, ${
        (menuRef.current.childElementCount - (menuContent + 1)) * height
      }px)`,
    };
  };

  const linkSubmit = async () => {
    setClicked((prev) => !prev);

    if (!isValidUrl(link)) {
      return setTitle(link);
    }

    const urlData = await fetch(link);
    console.log(urlData);
  };

  return (
    <div
      ref={menuRef}
      style={open ? checkMenuClassName() : {}}
      className={`${styles.menu} ${open ? '' : 'translate-y-full'}`}>
      <section ref={addContentRef}>
        <h1 className={`${styles.menu__title} ${roboto.className}`}>Add content</h1>
        <div className={styles.menu__content}>
          <ContentItem
            style={{ width: 124 }}
            title={'Create a Glean'}
            description={'Add content, links & descriptive text'}
          />
          <ContentItem
            style={{ width: 137 }}
            title={'Collection'}
            description={'Organise gleans & direct links'}
            imgFlex
          />
        </div>
        <div className={styles.menu__input}>
          <TextField
            value={link}
            setValue={setLink}
            onSubmit={linkSubmit}
            loadingAnimation={clicked}
            submitFn={() => {
              setMenuContent(1);
            }}
          />
        </div>
        <p className={styles.menu__caption}>
          <b>Powered by Gleans Ai</b> ✨ Create content automatically and make changes if needed.
        </p>
      </section>
      <section ref={createGleanRef}>
        <CreateGlean
          submitFn={() => {
            setMenuContent(2);
          }}
          setMenuContent={setMenuContent}
          title={title}
          setTitle={setTitle}
        />
      </section>
      <section ref={doneRef}>
        <div className="h-screen flex flex-col items-center">
          <Button
            text="Done"
            color="success"
            className="mt-auto mb-9 w-fit"
            onClick={() => {
              setIsMenuOpen(false);
              setMenuContent(0);
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default Menu;
