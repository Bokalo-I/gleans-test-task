'use client';

import React, { FC, useMemo, useRef, useState } from 'react';
import styles from './CreateGlean.module.scss';
import { Roboto } from 'next/font/google';
import Button from '../UI/Button/Button';
import TextEditor from '../UI/TextEditor/TextEditor';
import EmojiSection from '../EmojiSection/EmojiSection';
import {
  ICategory,
  ICollection,
  collections as collectionsArray,
  initialCategories,
  sortCollections,
} from '@/app/collections';
import Collections from '../Collections/Collections';
import Categories from '../Categories/Categories';
import GleanTitle from '../GleanTitle/GleanTitle';
import GleanDescription from '../GleanDescription/GleanDescription';

interface Props {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setMenuContent: React.Dispatch<React.SetStateAction<number>>;
  submitFn: () => void;
}

const CreateGlean: FC<Props> = ({ title, setTitle, setMenuContent, submitFn }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [description, setDescription] = useState<string>('');
  const [isEditorOpened, setIsEditorOpened] = useState<boolean>(false);
  const [editorType, setEditorType] = useState<'Title' | 'Description' | 'Collection'>('Title');
  const [collections, setCollections] = useState<ICollection[]>(sortCollections(collectionsArray));
  const [categories, setCategories] = useState<ICategory[]>(initialCategories);
  const [editorCollectionId, setEditorCollectionId] = useState<string>('');
  const [isCategoriesOpened, setIsCategoriesOpened] = useState<boolean>(false);

  const editorCollectionText = useMemo(
    () => collections.find(({ id }) => id === editorCollectionId)?.name,
    [collections, editorCollectionId],
  );

  const textEditorContent =
    (editorType === 'Title' && title) ||
    (editorType === 'Collection' && editorCollectionText) ||
    description;

  const changeCollectionText = (text: string) => {
    if (!editorCollectionId) {
      return;
    }

    const updatedCollections = collections.map((collection) =>
      collection.id === editorCollectionId ? { ...collection, name: text } : { ...collection },
    );

    setCollections(updatedCollections);
  };

  const handleOpenEditor = (
    hiddenValue: boolean,
    newEditorType: 'Title' | 'Description' | 'Collection',
  ) => {
    if (!hiddenValue) {
      return;
    }

    setEditorType(newEditorType);
    setIsEditorOpened(true);
  };

  const handleHidden = (
    textRef: React.RefObject<HTMLDivElement>,
    setHide: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (!textRef.current) {
      return;
    }

    const textLines =
      parseInt(window.getComputedStyle(textRef.current).height, 10) /
      parseInt(window.getComputedStyle(textRef.current).lineHeight, 10);

    if (textLines < 3) {
      setHide(false);
    }
  };

  const textEditorHandler =
    (editorType === 'Title' && setTitle) ||
    (editorType === 'Collection' && changeCollectionText) ||
    setDescription;

  const handleGoBack = () => {
    setMenuContent((prev) => prev - 1);
    containerRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles['create-glean-screen']}>
      <div
        ref={containerRef}
        className={`${styles['create-glean']} ${
          isEditorOpened ? styles['create-glean_hidden-left'] : ''
        } ${isCategoriesOpened ? styles['create-glean_hidden-right'] : ''}`}>
        <EmojiSection />
        <GleanTitle
          handleHidden={handleHidden}
          handleOpenEditor={handleOpenEditor}
          setTitle={setTitle}
          title={title}
        />
        <GleanDescription
          description={description}
          handleHidden={handleHidden}
          handleOpenEditor={handleOpenEditor}
          setDescription={setDescription}
        />
        {!!collections.length && (
          <Collections
            collections={collections}
            selectedCategories={categories}
            setCollections={setCollections}
            setEditorCollectionId={setEditorCollectionId}
            setEditorType={setEditorType}
            setIsEditorOpened={setIsEditorOpened}
            setIsCategoriesOpened={setIsCategoriesOpened}
          />
        )}
        <div className={styles['create-glean__buttons']}>
          <Button
            text="Back"
            onClick={handleGoBack}
            style={{ backgroundColor: '#2a2a2a', color: '#626262' }}
          />
          <Button text="Add Glean" onClick={submitFn} />
        </div>
      </div>
      {editorType && (
        <TextEditor
          open={isEditorOpened}
          text={textEditorContent}
          setText={textEditorHandler}
          textType={editorType}
          closeFn={setIsEditorOpened}
        />
      )}
      <Categories
        categories={categories}
        setCategories={setCategories}
        isCategoriesOpened={isCategoriesOpened}
        setIsCategoriesOpened={setIsCategoriesOpened}
      />
    </div>
  );
};

export default CreateGlean;
