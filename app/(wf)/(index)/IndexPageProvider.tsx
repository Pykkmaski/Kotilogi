'use client';

import { createContextWithHook } from 'kotilogi-app/utils/createContextWithHook';
import React, { useRef } from 'react';

const [IndexPageContext, useIndexPageContext] = createContextWithHook<{
  aboutRef: React.RefObject<HTMLElement>;
  footerRef: React.RefObject<HTMLElement>;
  contactRef: React.RefObject<HTMLElement>;
}>('IndexPageContext');

function IndexPageProvider({ children }) {
  const aboutRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  return (
    <IndexPageContext.Provider value={{ aboutRef, footerRef, contactRef }}>
      {children}
    </IndexPageContext.Provider>
  );
}

export { IndexPageProvider, useIndexPageContext };
