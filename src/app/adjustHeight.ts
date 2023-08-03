const adjustHeight = (
  ref: React.RefObject<HTMLTextAreaElement>,
  setValue?: (() => void) | null,
  setHide?: React.Dispatch<React.SetStateAction<boolean>>,
  maxLines?: number,
) => {
  if (!ref.current) {
    return;
  }

  if (setHide && typeof maxLines === 'number') {
    const textLines =
      ref.current.scrollHeight / parseInt(window.getComputedStyle(ref.current).lineHeight, 10);

    if (textLines > maxLines) {
      return setHide(textLines >= maxLines);
    }
  }

  ref.current.style.height = window.getComputedStyle(ref.current).lineHeight;
  ref.current.style.height = `${ref.current.scrollHeight}px`;
  setValue && setValue();
};

export default adjustHeight;
