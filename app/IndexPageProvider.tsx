'use client';

import { createContextWithHook } from 'kotilogi-app/utils/createContextWithHook';
import React, { useRef } from 'react';

const [IndexPageContext, useIndexPageContext] = createContextWithHook<{
  aboutRef: React.RefObject<HTMLElement>;
  footerRef: React.RefObject<HTMLElement>;
}>('IndexPageContext');

function IndexPageProvider({ children }) {
  const aboutRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  return (
    <IndexPageContext.Provider value={{ aboutRef, footerRef }}>
      {children}
    </IndexPageContext.Provider>
  );
}

export { IndexPageProvider, useIndexPageContext };
