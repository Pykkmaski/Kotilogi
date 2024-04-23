'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { createContext, useEffect, useRef } from 'react';

const HighlightingNavbarProviderContext = createContext<{
  currentPath: string;
}>(null);

export function HighlightingNavbarProvider({ children }) {
  const currentPath = usePathname().split('/').at(-1);

  return (
    <HighlightingNavbarProviderContext.Provider value={{ currentPath }}>
      {children}
    </HighlightingNavbarProviderContext.Provider>
  );
}

HighlightingNavbarProvider.Link = function ({ children, href }) {
  const { currentPath } = useHighlightingNavbarProviderContext();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const hrefPath = href.split('/').at(-1).split('?')[0];
    if (hrefPath === currentPath) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [currentPath]);

  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      selected,
    })
  );
};

const useHighlightingNavbarProviderContext = createUseContextHook(
  'HighlightingNavbarProviderContext',
  HighlightingNavbarProviderContext
);
