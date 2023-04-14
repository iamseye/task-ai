import { useRef } from 'react';

export const useScrollToView = () => {
  const ref = useRef<null | HTMLDivElement>(null);
  if (ref.current !== null) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }

  return ref;
};
