import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { createContext } from 'react';

const ValueProviderContext = createContext<{
  val: unknown;
} | null>(null);

type ValueProviderProps<T> = React.PropsWithChildren & {
  val: T;
};

export function ValueProvider<T>({ children, val }: ValueProviderProps<T>) {
  return <ValueProviderContext.Provider value={{ val }}>{children}</ValueProviderContext.Provider>;
}

export const useObjectProviderContext = createUseContextHook(
  'ValueProviderContext',
  ValueProviderContext
);
