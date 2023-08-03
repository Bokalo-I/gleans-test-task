import React, { useEffect, useState } from 'react';
import styles from './EmojiSection.module.scss';
import './styles.scss';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import ImageIcon from '@/icons/ImageIcon';
import Image from 'next/image';
import { generateRandomEmoji } from '@/app/emoji';
import { Roboto } from 'next/font/google';
import RefreshIcon from '@/icons/RefreshIcon';
import {
  averageColorWithPastelAndHueChange,
  averageColorWithWhiteAndSaturation,
  getEmojiMajorColor,
} from '@/app/color';

const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
  style: 'normal',
});

const EmojiSection = () => {
  const [emoji, setEmoji] = useState<string>('🕺🏼');
  const [video, setVideo] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [imageName, setImageName] = useState<string>('');
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);
  const [fileType, setFileType] = useState<'video' | 'image' | ''>('');

  const emojiMajorColor = getEmojiMajorColor(document.createElement('canvas'), emoji);
  const color1 = averageColorWithPastelAndHueChange(emojiMajorColor!);
  const color2 = averageColorWithWhiteAndSaturation(emojiMajorColor!);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImage('');
      setImageName('');
      setVideo('');
      setFileType('');
      return;
    }

    const [newFileType] = file.type.split('/') as ('video' | 'image')[];
    setFileType(newFileType);

    if (newFileType === 'video') {
      setIsVideoLoading(true);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (newFileType === 'image') {
        setImage(reader.result as string);
        setImageName(file.name);

        setVideo('');
      }
      if (newFileType === 'video') {
        setImage('');
        setImageName('');

        setVideo(reader.result as string);
      }
    };
  };

  useEffect(() => {
    if (image) {
      return;
    }

    const interval = setInterval(() => {
      setEmoji(generateRandomEmoji());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles['emoji-section']}>
      {!fileType ? (
        <SwitchTransition mode="out-in">
          <CSSTransition
            classNames={'fade'}
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', done, false);
            }}
            key={emoji}>
            <div
              className={styles['emoji-section__field']}
              style={{
                background: `radial-gradient(121.30% 121.30% at 50.43% -0.00%, ${color1} 0%, ${color2} 100%), rgba(0, 0, 0, 0.20)`,
              }}>
              <div className={styles['emoji-section__emoji']}>{emoji}</div>
              <div className={styles['emoji-section__helper']}>
                <ImageIcon style={{ marginRight: 16 }} height={45} width={45} />
                <h6 className={`${styles['emoji-section__info']} ${roboto.className}`}>
                  Paste or tap to change into an image or video.
                </h6>
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
      ) : (
        <>
          {fileType === 'image' && image && (
            <Image
              src={image}
              alt={imageName}
              className={styles['emoji-section__file']}
              width={240}
              height={240}
            />
          )}
          {isVideoLoading && (
            <div className={styles['emoji-section__loader']}>
              <RefreshIcon className="animate-spin" fill="#fff" />
            </div>
          )}
          {fileType === 'video' && video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              className={styles['emoji-section__file']}
              onCanPlayThrough={() => setIsVideoLoading(false)}
            />
          )}
        </>
      )}
      <input
        type="file"
        name="file"
        className={styles['emoji-section__input']}
        onChange={handleImageChange}
        accept="image/*, video/*"
        multiple={false}
        disabled={isVideoLoading}
      />
    </div>
  );
};

export default EmojiSection;
