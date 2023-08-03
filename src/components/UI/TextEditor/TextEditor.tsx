import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './TextEditor.module.scss';
import Button from '../Button/Button';
import adjustHeight from '@/app/adjustHeight';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  style: 'normal',
});

interface Props {
  open: boolean;
  text: string;
  setText: ((text: string) => void) | React.Dispatch<React.SetStateAction<string>>;
  textType: 'Description' | 'Title' | 'Collection';
  closeFn: React.Dispatch<React.SetStateAction<boolean>>;
}

const TextEditor: FC<Props> = ({ open, text, setText, textType = 'Description', closeFn }) => {
  const [textValue, setTextValue] = useState<string>('');
  const [isEditorShown, setIsEditorShown] = useState<boolean>(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight(textRef, () => setTextValue(e.target.value));
  };

  const handleSave = () => {
    setText(textValue);
    closeFn(false);
    setIsEditorShown(false);
  };

  const handleGoBack = () => {
    closeFn(false);
    setIsEditorShown(false);
  };

  const handleOpen = () => {
    setTextValue(text);

    if (open) {
      setTimeout(() => {
        adjustHeight(textRef);
        textRef.current?.focus();
        setIsEditorShown(true);
      }, 500);
    }
  };

  useLayoutEffect(() => {
    if (isEditorShown) {
      return;
    }
    adjustHeight(textRef);
  }, [textValue]);

  useEffect(() => {
    handleOpen();
  }, [open]);

  return (
    <div className={`${styles.editor} ${open ? styles.editor_opened : ''}`}>
      <div className={styles.editor__content}>
        <h1 className={styles['editor__text-type']}>{textType}</h1>
        <p className={styles['editor__text-info']}>
          Leave the {textType.toLowerCase()} empty to create a direct link
        </p>
        <textarea
          ref={textRef}
          className={`${styles.editor__text} ${isEditorShown ? styles.editor__text_shown : ''} ${
            roboto.className
          }`}
          value={textValue}
          onChange={handleTextChange}
          placeholder={textType}
        />
      </div>
      <div className={styles.editor__buttons}>
        <Button
          text="Back"
          onClick={handleGoBack}
          style={{ backgroundColor: '#2a2a2a', color: '#626262', marginRight: 17 }}
        />
        <Button text="Save" onClick={handleSave} />
      </div>
    </div>
  );
};

export default TextEditor;
