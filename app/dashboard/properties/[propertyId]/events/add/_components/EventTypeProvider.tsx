'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import React, { useCallback } from 'react';
import { getIdByLabel as _getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
type EventProviderProps = {
  refs: any;
};

const EventTypeContext = React.createContext<EventProviderProps | null>(null);

export function EventTypeProvider({
  children,
  refs,
  ...props
}: EventProviderProps & React.PropsWithChildren) {
  return (
    <EventTypeContext.Provider value={{ refs, ...props }}>{children}</EventTypeContext.Provider>
  );
}

export const useEventTypeContext = createUseContextHook('EventTypeContext', EventTypeContext);
