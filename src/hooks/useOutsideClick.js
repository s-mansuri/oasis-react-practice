import { useEffect, useRef } from 'react';

export const useOutsideClick = (handler, listenCapturing = true) => {
  const modalRef = useRef();

  // the third parameter TRUE would define that the event should be
  // handled only in the capturing way (events move down the tree) and not in the
  // bubbling way (events move up the tree)
  useEffect(() => {
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) handler();
    };

    document.addEventListener('click', handleClick, listenCapturing);

    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return modalRef;
};
