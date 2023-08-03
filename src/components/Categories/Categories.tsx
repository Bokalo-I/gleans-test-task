import React, { FC, SetStateAction } from 'react';
import Button from '../UI/Button/Button';
import { ICategory } from '@/app/collections';
import { Roboto } from 'next/font/google';
import styles from './Categories.module.scss';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  style: 'normal',
});

interface Props {
  isCategoriesOpened: boolean;
  categories: ICategory[];
  setCategories: React.Dispatch<SetStateAction<ICategory[]>>;
  setIsCategoriesOpened: React.Dispatch<SetStateAction<boolean>>;
}

const Categories: FC<Props> = ({
  isCategoriesOpened,
  categories,
  setCategories,
  setIsCategoriesOpened,
}) => {
  const handleSave = () => {
    setIsCategoriesOpened(false);
  };

  const handleCategoryClick = (categoryName: string) => {
    setCategories(
      categories.map((category) =>
        category.name === categoryName
          ? { ...category, isAdded: !category.isAdded }
          : { ...category },
      ),
    );
  };

  return (
    <div className={`${styles.categories} ${isCategoriesOpened ? '-left-0' : '-left-full'}`}>
      <h1 className={`${styles.categories__title} ${roboto.className}`}>Collections</h1>
      <div className={styles.categories__list}>
        {categories.map((category, i) => (
          <div
            key={i}
            onClick={() => handleCategoryClick(category.name)}
            style={category.isAdded ? { backgroundColor: '#D9D9D923' } : {}}
            className={`${styles.categories__item} ${roboto.className}`}>
            {category.name}
          </div>
        ))}
      </div>
      <Button className={styles.categories__button} text="Save" onClick={handleSave} />
    </div>
  );
};

export default Categories;
