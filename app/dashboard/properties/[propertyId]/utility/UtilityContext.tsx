'use client';

import { UtilityDataType } from 'kotilogi-app/dataAccess/types';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { createContext } from 'react';

type UtilityProviderProps = {
  data: UtilityDataType[];
  selectedTypes: string[];
  allTypes?: string[];
  year: null | number;
  years?: number[];
};

const UtilityContext = createContext<UtilityProviderProps>(null);

export function UtilityProvider({
  children,
  data,
  selectedTypes,
  allTypes = ['Lämmitys', 'Vesi', 'Sähkö'],
  year,
  years,
}: UtilityProviderProps & React.PropsWithChildren) {
  return (
    <UtilityContext.Provider value={{ data, selectedTypes, allTypes, year, years }}>
      {children}
    </UtilityContext.Provider>
  );
}

export const useUtilityProviderContext = createUseContextHook('UtilityContext', UtilityContext);
