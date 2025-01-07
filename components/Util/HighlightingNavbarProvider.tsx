'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { createContext, useEffect, useRef } from 'react';
import { PassProps } from './PassProps';

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

HighlightingNavbarProvider.Link = function ({ children }) {
  if (React.Children.count(children) !== 1) {
    throw new Error('Only one child can be passed to a HighlightingNavbarProvider.Link!');
  }

  const [child] = React.Children.toArray(children) as React.ReactElement[];
  const { currentPath } = useHighlightingNavbarProviderContext();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const hrefPath = (child.props as TODO).href.split('/').at(-1).split('?')[0];
    console.log(hrefPath, currentPath);
    if (hrefPath === currentPath) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [currentPath]);

  return <PassProps selected={selected}>{children}</PassProps>;
};

const useHighlightingNavbarProviderContext = createUseContextHook(
  'HighlightingNavbarProviderContext',
  HighlightingNavbarProviderContext
);
