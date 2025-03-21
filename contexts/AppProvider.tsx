'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

const AppContext = createContext<{
  language: string;

  setLanguage: Dispatch<SetStateAction<string>>;
} | null>(null);

type AppProviderProps = React.PropsWithChildren;

export function AppProvider({ children }: AppProviderProps) {
  const [language, setLanguage] = useState('fi');

  return <AppContext.Provider value={{ language, setLanguage }}>{children}</AppContext.Provider>;
}

export const useAppContext = createUseContextHook('AppContext', AppContext);
