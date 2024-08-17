'use client';

import { UtilityDataType } from 'kotilogi-app/models/types';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { createContext } from 'react';

type UtilityProviderProps = {
  data: UtilityDataType[];
  selectedTypes: string[];
  allTypes: string[];
};

const UtilityContext = createContext<UtilityProviderProps>(null);

export function UtilityProvider({
  children,
  data,
  selectedTypes,
  allTypes,
}: UtilityProviderProps & React.PropsWithChildren) {
  return (
    <UtilityContext.Provider value={{ data, selectedTypes, allTypes }}>
      {children}
    </UtilityContext.Provider>
  );
}

export const useUtilityProviderContext = createUseContextHook('UtilityContext', UtilityContext);
