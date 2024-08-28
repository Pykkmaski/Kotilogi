import { useState } from 'react';

export function useModal(element: React.ReactElement) {
  const [elem, setElem] = useState(null);

  const open = () => setElem(element);
  const close = () => setElem(null);

  return {
    modal: elem,
    open,
    close,
  };
}
