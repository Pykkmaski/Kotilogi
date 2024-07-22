'use client';

import { UtilityType } from 'kotilogi-app/models/enums/UtilityType';
import { UtilityDataType } from 'kotilogi-app/models/types';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { createContext } from 'react';

const UsageProviderContext = createContext<{
  propertyId: string;
  timestamps: number[];
  data: UtilityDataType[];
  type: UtilityType;
  displayYear: string;
}>(null);

type UsageProviderProps = React.PropsWithChildren & {
  propertyId: string;
  data: UtilityDataType[];
  timestamps: number[];
  type: UtilityType;
  displayYear: string;
};

export function UsageProvider({
  children,
  propertyId,
  data,
  timestamps,
  type,
  displayYear,
}: UsageProviderProps) {
  return (
    <UsageProviderContext.Provider value={{ propertyId, type, data, timestamps, displayYear }}>
      {children}
    </UsageProviderContext.Provider>
  );
}

export const useUsageProviderContext = createUseContextHook(
  'UsageProviderContext',
  UsageProviderContext
);
