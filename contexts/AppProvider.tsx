'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

const AppContext = createContext<{
  language: string;
  propertyTypeIds: TODO;
  setLanguage: Dispatch<SetStateAction<string>>;
} | null>(null);

type AppProviderProps = React.PropsWithChildren & {
  propertyTypeIds: TODO;
};

export function AppProvider({ children, propertyTypeIds }: AppProviderProps) {
  const [language, setLanguage] = useState('fi');

  return (
    <AppContext.Provider value={{ language, propertyTypeIds, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = createUseContextHook('AppContext', AppContext);
