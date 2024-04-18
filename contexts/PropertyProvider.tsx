'use client';

import React, { createContext, useContext } from 'react';

interface PropertyProviderProps {
  property: Kotidok.PropertyType;
  children: React.ReactNode;
}

const PropertyContext = createContext<{ property: Kotidok.PropertyType } | null>(null);

export default function PropertyProvider(props: PropertyProviderProps) {
  const contextValue = {
    property: props.property,
  };

  return <PropertyContext.Provider value={contextValue}>{props.children}</PropertyContext.Provider>;
}

export function usePropertyProvider(): { property: Kotidok.PropertyType } {
  const context: { property: Kotidok.PropertyType } | null = useContext(PropertyContext);
  if (!context) throw new Error('Property context: Property cannot be null!');
  return context;
}
