'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { createContext } from 'react';

const UsageProviderContext = createContext<{
  propertyId: string;
  timestamps: TODO[];
  data: Kotidok.UsageType[];
  type: Kotidok.UsageTypeType | 'all';
  displayYear: string;
}>(null);

type UsageProviderProps = React.PropsWithChildren & {
  propertyId: string;
  data: Kotidok.UsageType[];
  timestamps: TODO[];
  type: Kotidok.UsageTypeType | 'all';
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
