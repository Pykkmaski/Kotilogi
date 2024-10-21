import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import React, { useMemo } from 'react';
import { createContext, useCallback, useState } from 'react';
import { PassProps } from './PassProps';

const ElementReferenceProviderContext = createContext(null);

export function ElementReferenceProvider({ children }: React.PropsWithChildren) {
  const [element, setElement] = useState(null);

  const updateReference = useCallback(
    e => {
      setElement(e.currentTarget);
    },
    [setElement]
  );

  return (
    <ElementReferenceProviderContext.Provider value={{ element, updateReference }}>
      {children}
    </ElementReferenceProviderContext.Provider>
  );
}

ElementReferenceProvider.Reference = function ({ children }) {
  const { updateReference } = useElementReferenceProvider();
  const [child] = useMemo(
    () => React.Children.toArray(children) as React.ReactElement[],
    [children]
  );

  return (
    <PassProps
      onClick={e => {
        child.props.onClick && child.props.onClick(e);
        updateReference(e);
      }}>
      {child}
    </PassProps>
  );
};

export const useElementReferenceProvider = createUseContextHook(
  'ElementReferenceProviderContext',
  ElementReferenceProviderContext
);
