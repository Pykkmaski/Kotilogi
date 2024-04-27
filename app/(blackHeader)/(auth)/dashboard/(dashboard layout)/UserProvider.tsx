'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { createContext } from 'react';

const UserProviderContext = createContext<{
  user: TODO;
} | null>(null);

type UserProviderProps = React.PropsWithChildren & {
  user: {
    email: string;
  };
};

export function UserProvider({ children, user }: UserProviderProps) {
  return <UserProviderContext.Provider value={{ user }}>{children}</UserProviderContext.Provider>;
}

export const useUserProvider = createUseContextHook('UserProviderContext', UserProviderContext);
