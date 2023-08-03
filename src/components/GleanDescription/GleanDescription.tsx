import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './GleanDescription.module.scss';
import { Roboto } from 'next/font/google';
import adjustHeight from '@/app/adjustHeight';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  style: 'normal',
});

interface Props {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  handleOpenEditor: (
    hiddenValue: boolean,
    newEditorType: 'Title' | 'Description' | 'Collection',
  ) => void;
  handleHidden: (
    textRef: React.RefObject<HTMLDivElement>,
    setHide: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
}

const GleanDescription: FC<Props> = ({
  handleOpenEditor,
  description,
  setDescription,
  handleHidden,
}) => {
  const [isDescriptionHidden, setIsDescriptionHidden] = useState<boolean>(false);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const descriptionTextRef = useRef<HTMLDivElement>(null);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight(descriptionRef, () => setDescription(e.target.value), setIsDescriptionHidden, 4);
  };

  useLayoutEffect(() => {
    adjustHeight(descriptionRef, null, setIsDescriptionHidden, 4);
  }, []);

  useEffect(() => {
    handleOpenEditor(isDescriptionHidden, 'Description');
  }, [isDescriptionHidden]);

  // it's workin' on return from editor
  useEffect(() => {
    handleHidden(descriptionTextRef, setIsDescriptionHidden);
  }, [description]);

  return (
    <div
      className={`${styles['glean-description']} ${
        !isDescriptionHidden ? '' : styles['glean-description_transit']
      }`}>
      {!isDescriptionHidden ? (
        <textarea
          ref={descriptionRef}
          className={`${styles['glean-description__content']} ${roboto.className}`}
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
        />
      ) : (
        <div
          ref={descriptionTextRef}
          className={`${styles['glean-description__content_disabled']} ${roboto.className}`}
          onClick={() => {
            handleOpenEditor(isDescriptionHidden, 'Description');
          }}>
          {description}
        </div>
      )}
    </div>
  );
};

export default GleanDescription;
