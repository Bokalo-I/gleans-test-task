import React, { FC } from 'react';
import styles from './Collections.module.scss';
import PlusMinusControl from '../UI/PlusMinusControl/PlusMinusControl';
import { ICategory, ICollection, sortCollections } from '@/app/collections';
import CollectionIcon from '@/icons/CollectionIcon';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  style: 'normal',
});

interface Props {
  selectedCategories: ICategory[];
  collections: ICollection[];
  setCollections: React.Dispatch<React.SetStateAction<ICollection[]>>;
  setEditorCollectionId: React.Dispatch<React.SetStateAction<string>>;
  setEditorType: React.Dispatch<React.SetStateAction<'Collection' | 'Title' | 'Description'>>;
  setIsEditorOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCategoriesOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Collections: FC<Props> = ({
  collections,
  selectedCategories,
  setCollections,
  setEditorCollectionId,
  setEditorType,
  setIsEditorOpened,
  setIsCategoriesOpened,
}) => {
  const filteredCollections = collections.filter((collection) =>
    selectedCategories
      .filter(({ isAdded }) => isAdded)
      .map(({ name }) => name)
      .includes(collection.category),
  );

  return (
    <>
      {!!filteredCollections.length && (
        <div className={styles.collections}>
          {sortCollections(filteredCollections).map(({ id, isAdded, name }) => {
            return (
              <PlusMinusControl
                plus={!isAdded}
                text={name}
                id={id}
                key={id}
                collections={collections}
                setCollections={setCollections}
                setEditorCollectionId={setEditorCollectionId}
                setIsEditorOpened={setIsEditorOpened}
                setEditorType={setEditorType}
              />
            );
          })}
        </div>
      )}
      <div className={styles['collections-add']} onClick={() => setIsCategoriesOpened(true)}>
        <div className={`${styles['collections-caption']} ${roboto.className}`}>
          Add to collection
        </div>
        <CollectionIcon />
      </div>
    </>
  );
};

export default Collections;
