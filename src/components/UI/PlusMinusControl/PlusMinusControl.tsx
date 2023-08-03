import React, { FC, useLayoutEffect, useRef } from 'react';
import styles from './PlusMinusControl.module.scss';
import PlusIcon from '@/icons/PlusIcon';
import MinusIcon from '@/icons/MinusIcon';
import { Roboto } from 'next/font/google';
import { ICollection, sortCollections } from '@/app/collections';
import { useIsVisible } from '@/hooks/useIsVisible';

const TEXT_MAX_LENGTH = 30;

const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
  style: 'normal',
});

interface Props {
  text: string;
  plus?: boolean;
  id: string;
  collections: ICollection[];
  setCollections: React.Dispatch<React.SetStateAction<ICollection[]>>;
  setEditorCollectionId: React.Dispatch<React.SetStateAction<string>>;
  setEditorType: React.Dispatch<React.SetStateAction<'Collection' | 'Title' | 'Description'>>;
  setIsEditorOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlusMinusControl: FC<Props> = ({
  text,
  plus,
  id,
  collections,
  setCollections,
  setEditorCollectionId,
  setEditorType,
  setIsEditorOpened,
}) => {
  const textRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(categoryRef);

  const currentCollection = collections.find((collection) => collection.id === id);

  const goToEditor = (collection: ICollection) => {
    if (collection && collection.name.length >= TEXT_MAX_LENGTH) {
      setEditorCollectionId(collection.id);
      setEditorType('Collection');
      setIsEditorOpened(true);
    }
  };

  const handleTooMuchText = () => {
    if (!currentCollection) {
      return;
    }
    goToEditor(currentCollection);
  };

  const handleChangeInputWidth = () => {
    if (textRef.current) {
      textRef.current.style.width = '10px';
      textRef.current.style.width = `${textRef.current.scrollWidth}px`;
    }
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeInputWidth();

    const newCollections: ICollection[] = collections.map((collection) =>
      id === collection.id ? { ...collection, name: e.target.value } : { ...collection },
    );

    goToEditor({ ...currentCollection, name: e.target.value } as ICollection);

    setCollections(newCollections);
  };

  const handlePlusClick = () => {
    const newCollections = collections.map((categoryData) =>
      id === categoryData.id ? { ...categoryData, isAdded: true } : { ...categoryData },
    );

    setCollections(sortCollections(newCollections));
  };

  const handleMinusClick = () => {
    setCollections((prevCollections) => {
      if (!currentCollection) {
        return [...prevCollections];
      }

      if (currentCollection.isAdded) {
        const newCollections: ICollection[] = collections.map((collectionData) =>
          id === collectionData.id ? { ...collectionData, isAdded: false } : { ...collectionData },
        );

        return sortCollections(newCollections);
      } else {
        const newCollections: ICollection[] = collections.filter(
          (collectionData) => id !== collectionData.id,
        );

        return newCollections;
      }
    });
  };

  useLayoutEffect(() => {
    handleChangeInputWidth();
  }, [isVisible]);

  return (
    <div ref={categoryRef} className={`${styles.control} ${roboto.className}`}>
      {text.length >= TEXT_MAX_LENGTH ? (
        <div onClick={handleTooMuchText} className={styles.control__text}>
          {text.slice(0, TEXT_MAX_LENGTH)}...
        </div>
      ) : (
        <input
          ref={textRef}
          className={`${styles.control__text} ${styles.control__input}`}
          value={text}
          onChange={handleChangeText}
        />
      )}
      {plus && (
        <>
          <button className={styles.control__plus} onClick={handlePlusClick}>
            <PlusIcon />
          </button>
          <div className={styles.control__divider} />
        </>
      )}
      <button className={styles.control__minus} onClick={handleMinusClick}>
        <MinusIcon />
      </button>
    </div>
  );
};

export default PlusMinusControl;
