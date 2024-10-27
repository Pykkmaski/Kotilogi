'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import { createContext } from 'react';

const DashboardContext = createContext<{
  propertyTypeIds: TODO;
  buildingTypeIds: TODO;
}>(null);

type DashboardProviderProps = React.PropsWithChildren & {
  propertyTypeIds: TODO;
  buildingTypeIds: TODO;
};

export function DashboardProvider({
  children,
  propertyTypeIds,
  buildingTypeIds,
}: DashboardProviderProps) {
  return (
    <DashboardContext.Provider value={{ propertyTypeIds, buildingTypeIds }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboardProvider = createUseContextHook('DashboardContext', DashboardContext);
