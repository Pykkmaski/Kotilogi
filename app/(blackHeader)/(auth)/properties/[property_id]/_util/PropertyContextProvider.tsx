'use client';

import { createContext, useContext } from 'react';

type ContextValue = {
  property: Kotidok.PropertyType;
};

const PropertyContext = createContext<ContextValue | null>(null);

type ContextProps = {
  value: ContextValue;
  children: React.ReactNode;
};

export default function PropertyContextProvider(props: ContextProps) {
  return <PropertyContext.Provider value={props.value}>{props.children}</PropertyContext.Provider>;
}

export function usePropertyContext() {
  const context = useContext(PropertyContext);
  if (!context) throw new Error('Property context cannot be null!');
  return context;
}
