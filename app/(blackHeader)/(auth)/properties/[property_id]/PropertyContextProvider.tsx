'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { createContext } from 'react';

const PropertyProviderContext = createContext<{
  property: Kotidok.PropertyType;
}>(null);

type PropertyProviderProps = {
  children: React.ReactNode;
  property: Kotidok.PropertyType;
};

export function PropertyProvider({ children, property }: PropertyProviderProps) {
  return (
    <PropertyProviderContext.Provider value={{ property }}>
      {children}
    </PropertyProviderContext.Provider>
  );
}

export const usePropertyProviderContext = createUseContextHook(
  'PropertyProviderContext',
  PropertyProviderContext
);
