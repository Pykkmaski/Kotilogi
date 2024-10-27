'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import { createContext } from 'react';

type AddComponentProviderProps = {
  refs: { [x: string]: any[] };
};

const AddComponentContext = createContext<AddComponentProviderProps | null>(null);

export function AddComponentProvider({
  children,
  ...props
}: AddComponentProviderProps & React.PropsWithChildren) {
  return (
    <AddComponentContext.Provider value={{ ...props }}>{children}</AddComponentContext.Provider>
  );
}

export const useAddComponentContext = createUseContextHook(
  'AddComponentContext',
  AddComponentContext
);
