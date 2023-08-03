import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './GleanTitle.module.scss';
import adjustHeight from '@/app/adjustHeight';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
  style: 'normal',
});

interface Props {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleOpenEditor: (
    hiddenValue: boolean,
    newEditorType: 'Title' | 'Description' | 'Collection',
  ) => void;
  handleHidden: (
    textRef: React.RefObject<HTMLDivElement>,
    setHide: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
}

const GleanTitle: FC<Props> = ({ title, setTitle, handleOpenEditor, handleHidden }) => {
  const [isTitleHidden, setIsTitleHidden] = useState<boolean>(false);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const titleTextRef = useRef<HTMLDivElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight(titleRef, () => setTitle(e.target.value), setIsTitleHidden, 3);
  };

  useLayoutEffect(() => {
    adjustHeight(titleRef, null, setIsTitleHidden, 3);
  }, []);

  useEffect(() => {
    handleOpenEditor(isTitleHidden, 'Title');
  }, [isTitleHidden]);

  // it's workin' on return from editor
  useEffect(() => {
    handleHidden(titleTextRef, setIsTitleHidden);
  }, [title]);

  return (
    <div
      className={`${styles['glean-title']} ${!isTitleHidden ? '' : styles['glean-title_transit']}`}>
      {!isTitleHidden ? (
        <textarea
          ref={titleRef}
          className={`${styles['glean-title__content']} ${roboto.className}`}
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
        />
      ) : (
        <div
          ref={titleTextRef}
          className={`${styles['glean-title__content_disabled']} ${roboto.className}`}
          onClick={() => {
            handleOpenEditor(isTitleHidden, 'Title');
          }}>
          {title}
        </div>
      )}
    </div>
  );
};

export default GleanTitle;
