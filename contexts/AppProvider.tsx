'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

const AppContext = createContext<{
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
} | null>(null);

export function AppProvider({ children }: React.PropsWithChildren) {
  const [language, setLanguage] = useState('fi');

  return <AppContext.Provider value={{ language, setLanguage }}>{children}</AppContext.Provider>;
}

export const useAppContext = createUseContextHook('AppContext', AppContext);
