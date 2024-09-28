'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import React, { useCallback } from 'react';

type EventProviderProps = {
  refs: any;
};

const EventTypeContext = React.createContext<
  | (EventProviderProps & {
      getIdByLabel: (types: any[], label: string, labelName?: string) => number;
    })
  | null
>(null);

export function EventTypeProvider({
  children,
  refs,
  ...props
}: EventProviderProps & React.PropsWithChildren) {
  const getIdByLabel = useCallback((types: any[], label: string, labelName: string = 'label') => {
    const t = types.find(t => t[labelName] == label);
    return (t && t.id) || null;
  }, []);

  return (
    <EventTypeContext.Provider value={{ refs, getIdByLabel, ...props }}>
      {children}
    </EventTypeContext.Provider>
  );
}

export const useEventTypeContext = createUseContextHook('EventTypeContext', EventTypeContext);
