import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { createContext } from 'react';

const ObjectProviderContext = createContext<{
  obj: unknown;
} | null>(null);

type ObjectProviderProps<T> = React.PropsWithChildren & {
  obj: T;
};

export function ObjectProvider<T extends object>({ children, obj }: ObjectProviderProps<T>) {
  return (
    <ObjectProviderContext.Provider value={{ obj }}>{children}</ObjectProviderContext.Provider>
  );
}

export const useObjectProviderContext = createUseContextHook(
  'ObjectProviderContext',
  ObjectProviderContext
);
